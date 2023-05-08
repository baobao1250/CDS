import { Box, Checkbox } from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { createStyles, fade, makeStyles, Theme, withStyles } from "@material-ui/core/styles";
import { TransitionProps } from "@material-ui/core/transitions";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import TreeItem, { TreeItemProps } from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import React, { useEffect, useState } from "react";
import { animated, useSpring } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import PersonIcon from "@material-ui/icons/Person";
import HomeIcon from "@material-ui/icons/Home";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import GroupIcon from "@material-ui/icons/Group";

const useStyles = makeStyles(
    createStyles({
        root: {
            flexGrow: 1,
        },
    })
);
export type NodeItem = {
    nodeId: string;
    nodeLabel: string;
    children?: NodeItem[];
    checked?: boolean;
    hasRoles?: boolean;
    isUser?: boolean;
};

export type CurrentNode = {
    node: NodeItem;
    index: number;
};

function TransitionComponent(props: TransitionProps) {
    const style = useSpring({
        from: { opacity: 0, transform: "translate3d(20px,0,0)" },
        to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

const StyledTreeItem = withStyles((theme: Theme) =>
    createStyles({
        iconContainer: {
            "& .close": {
                opacity: 0.3,
            },
        },
        group: {
            marginLeft: 7,
            // paddingLeft: 18,
            borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
        },
    })
)((props: TreeItemProps) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

export interface TreeItemChildPropsI {
    item: NodeItem;
    id: string;
    parentIndex: number;
    childId?: string;
    childIndex?: number;
    onCheckClick: (checked: boolean, nodeId: string, parentIndex: number, childId?: string, childIndex?: number) => void;
}

const Label = (props: TreeItemChildPropsI) => {
    const { item, id, parentIndex, childId, childIndex, onCheckClick } = props;
    return (
        <Box display="flex" alignItems="center">
            <Checkbox
                size="small"
                color="default"
                checked={Boolean(item.checked)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>, checkedValue: boolean) => {
                    onCheckClick(checkedValue, id, parentIndex, childId, childIndex);
                }}
            />
            {item.isUser ? (
                <PersonIcon style={{ paddingRight: "5px" }} />
            ) : item.isUser === false ? (
                <HomeIcon style={{ paddingRight: "5px" }} />
            ) : !item.children ? (
                <VpnKeyIcon style={{ paddingRight: "5px" }} />
            ) : (
                <GroupIcon style={{ paddingRight: "5px" }} />
            )}
            <Box component="span" color={Boolean(item.hasRoles) ? "#367fa9" : "#333333"}>
                {item.nodeLabel}
            </Box>
        </Box>
    );
};

const TreeItemChild = (props: TreeItemChildPropsI) => {
    const { item, id, parentIndex, childId, childIndex, onCheckClick } = props;
    return (
        <StyledTreeItem
            nodeId={item.nodeId}
            label={<Label item={item} onCheckClick={onCheckClick} id={id} childId={childId} childIndex={childIndex} parentIndex={parentIndex} />}
        >
            {item.children?.map((child, subIndex) => {
                return (
                    <TreeItemChild item={child} id={id} childId={child.nodeId} childIndex={subIndex} onCheckClick={onCheckClick} parentIndex={parentIndex} />
                );
            })}
        </StyledTreeItem>
    );
};

export interface TreeDataPropsI {
    items: NodeItem[];
    showExpanded?: boolean;
    onNodeSelected?: (nodeItem: NodeItem) => void;
    onCheckClick?: (nodeItem: NodeItem) => void;
    afterCheckItem?: (nodes: NodeItem[]) => void;
}
export const TreeViewData = (props: TreeDataPropsI) => {
    const classes = useStyles();
    const { onNodeSelected, afterCheckItem } = props;

    const [items, setItems] = useState<NodeItem[]>([]);
    const [expanded, setExpanded] = React.useState<any[]>([]);
    const [selected, setSelected] = React.useState<any[]>([]);

    useEffect(() => {
        setItems(props.items);
    }, [props.items]);

    useEffect(() => {
        if (Boolean(props.showExpanded)) {
            let selectedNode: string[] = [];
            loadCheckedNode({ nodes: items, result: selectedNode });
            setExpanded(selectedNode);
        }
    }, [props.showExpanded]);

    const handleToggle = (event: React.ChangeEvent<any>, nodeIds: string[]) => {
        if (event.target.nodeName === "INPUT") {
            return;
        }
        setExpanded(nodeIds);
    };

    function getCurrentNode({ nodes, nodeId }: { nodes?: NodeItem[]; nodeId: string }): CurrentNode | undefined {
        if (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].nodeId == nodeId) {
                    return { node: nodes[i], index: i } as CurrentNode;
                }
                var found = getCurrentNode({ nodes: nodes[i].children, nodeId });
                if (found) return found;
            }
        }
    }

    function loadCheckedNode({ nodes, result }: { nodes?: NodeItem[]; result: string[] }) {
        if (nodes) {
            for (var i = 0; i < nodes.length; i++) {
                if (nodes[i].children) {
                    result.push(nodes[i].nodeId);
                    loadCheckedNode({ nodes: nodes[i].children, result: result });
                }
            }
        }
    }

    const handleSelect = (event: React.ChangeEvent<any>, nodeIds: string[] | string) => {
        if (event.target.nodeName === "INPUT") {
            return;
        }
        if (onNodeSelected) {
            let nodeId = String(nodeIds);
            let selectedNode = getCurrentNode({ nodes: items, nodeId: nodeId });
            if (selectedNode?.node && Boolean(selectedNode?.node.hasRoles)) {
                onNodeSelected(selectedNode?.node);
            }
        }
    };

    const handleCheckClick = (checked: boolean, nodeId: string, parentIndex: number, childId?: string, childIndex?: number) => {
        if (typeof childIndex !== "undefined" && typeof childId !== "undefined") {
            let parentNode = items[parentIndex];
            if (parentNode.children) {
                parentNode.children.filter((item) => item.nodeId === childId)[0].checked = checked;
                if (parentNode.children.filter((item) => item.checked === checked).length === parentNode.children.length) {
                    parentNode.checked = checked;
                } else {
                    parentNode.checked = false;
                }
                let newItems = [...items];
                newItems[parentIndex] = parentNode;
                setItems(newItems);
                if (afterCheckItem) {
                    afterCheckItem(newItems);
                }
            }
        } else {
            let nodes = items.filter((item) => item.nodeId === nodeId)[0].children;
            if (nodes) {
                nodes = [...formatData({ arr: nodes, checked: checked })];
            }
            let currentItem: NodeItem = {
                ...items.filter((item) => item.nodeId === nodeId)[0],
                checked: checked,
                children: nodes,
            };
            let newItems = [...items];
            newItems[parentIndex] = currentItem;
            setItems(newItems);
            if (afterCheckItem) {
                afterCheckItem(newItems);
            }
        }
    };

    function formatData({ arr, checked }: { arr?: NodeItem[]; checked: boolean }): NodeItem[] {
        if (arr) {
            arr.map((i) => {
                i.checked = checked;
                if (i.children) {
                    i.children = [...formatData({ arr: i.children, checked: checked })];
                }
            });
            return arr;
        }
        return [];
    }

    return (
        <>
            <TreeView
                className={classes.root}
                defaultCollapseIcon={<ArrowDropDownIcon />}
                defaultExpandIcon={<ArrowRightIcon />}
                defaultExpanded={[]}
                expanded={expanded}
                selected={selected}
                onNodeToggle={handleToggle}
                onNodeSelect={handleSelect}
            >
                {items.map((item, parentIndex) => {
                    return <TreeItemChild id={item.nodeId} item={item} parentIndex={parentIndex} onCheckClick={handleCheckClick} />;
                })}
            </TreeView>
        </>
    );
};
