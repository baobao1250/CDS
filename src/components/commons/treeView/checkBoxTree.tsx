import { Checkbox, FormControlLabel } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IndeterminateCheckBoxIcon from '@material-ui/icons/IndeterminateCheckBox';
import { TreeItem, TreeView } from "@material-ui/lab";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        condensed: {
            paddingTop: 0,
            paddingBottom: 0
        }
    }),
);

export interface TreeNode {
    value: string;
    label: string;
    keyRouter?: string;
    path_?: string;
    children?: TreeNode[];
    checked?: boolean;
    code?:string;
    isEmptyGroup?: boolean;
}

interface CheckboxTreePropsI {
    nodes: TreeNode[];
    checked: string[];
    emptyChecked?: string[];
    expanded: string[];
    setChecked: (checked: string[]) => void;
    setEmptyChecked?: (checked: string[]) => void;
    setExpanded: (expanded: string[]) => void;
}

function leafIds(node: TreeNode): string[] {
    return !node.children || node.children.length === 0
        ? [node.value]
        : node.children.map(leafIds).flat();
}

export function leafNodes(node: TreeNode): TreeNode[] {
    return !node.children || node.children.length === 0
        ? [node]
        : node.children.map(leafNodes).flat();
}

export function CheckboxTree(props: CheckboxTreePropsI) {
    const classes = useStyles();
    const { checked, expanded, nodes, setChecked, setExpanded, emptyChecked, setEmptyChecked } = props;

    const handleCheck = (node: TreeNode, newValue: boolean) => {
        const value = node.isEmptyGroup ? emptyChecked?.includes(node.value) : checked.includes(node.value);
        if (!node.children || node.children.length === 0) {
            if (value === newValue) return;
            if (node.isEmptyGroup && emptyChecked && setEmptyChecked) {
                setEmptyChecked(
                    newValue
                    ? [...checked, node.value]
                    : emptyChecked.filter(id => id !== node.value));
            }
            else {
                setChecked(
                    newValue
                        ? [...checked, node.value]
                        : checked.filter(id => id !== node.value)
                );
            }
        } else {
            const ids = leafIds(node);
            const remaining = checked.filter(id => !ids.includes(id));
            setChecked(newValue ? [...remaining, ...ids] : remaining);
        }
    };

    function TreeNode({ node }: { node: TreeNode }) {
        const isChecked = node.isEmptyGroup ? emptyChecked?.includes(node.value) : leafIds(node).every(id => checked.includes(id));
        const isIndeterminate = !node.isEmptyGroup &&
            !isChecked && leafIds(node).some(id => checked.includes(id));
        const onChange = () => {
            handleCheck(node, !isChecked);
        };

        return (
            <TreeItem key={node.value} nodeId={node.value}
                label={
                    <FormControlLabel
                        control={
                            <Checkbox size="small" color="primary" className={classes.condensed}
                                checked={isChecked}
                                onChange={onChange} onClick={e => e.stopPropagation()}
                                indeterminate={isIndeterminate}
                                indeterminateIcon={<IndeterminateCheckBoxIcon color="primary" />}
                                disableRipple
                            />
                        } label={node.label} onClick={e  => e.stopPropagation()}
                    />
                }
            >
                {node.children && node.children.length > 0 && <TreeNodes nodes={node.children} />}
            </TreeItem>
        );
    }

    function TreeNodes({ nodes }: { nodes: TreeNode[] }) {
        return (
            <>
                { nodes.map((node, k) => <TreeNode node={node} key={k} />)}
            </>
        );
    }

    return (
        <>
            <TreeView className={classes.root} multiSelect
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultExpanded={[]}
                expanded={expanded}
                selected={checked}
                onNodeToggle={(_, nodes) => setExpanded(nodes)}
            >
                <TreeNodes nodes={nodes} />
            </TreeView>
        </>
    );
}
