import { Pageable } from "commons/components/customReactTable/customReactTable";
import _get from "lodash/get";
import React, { useState } from "react";
import { DeepPartial, Path, PathValue, useForm } from "react-hook-form";
import { PageRequest } from "../models/baseService";
import { useLoader } from "../stores/usePageLoading";
import { useSort } from "../stores/useSort";
import useImmerState from "./useImmerState";
export interface BaseTableI<T> {
    data: T[];
    total: number;
}
let counter = 0;
export function useContextTable<T extends object, C extends PageRequest>(
    init: DeepPartial<C>,
    Service: any,
    handleReset?: () => void,
    handleMoreAction?: any,
    addValue?: object
) {
    const { isLoading, onLoading } = useLoader((s:any) => s);
    const [state, setImmerState] = useImmerState<BaseTableI<T>>({ data: [], total: 0 });
    const pageSize = "pageSize" as Path<C>;
    const pageNumber = "pageNumber" as Path<C>;

    // support: Sổ văn bản đi
    const [statusSupport, setStatusSupport] = React.useState<object>({});

    const { sortBy } = useSort((s:any) => s);

    const { register, setValue, getValues, watch, handleSubmit, reset } = useForm<C>({
        defaultValues: init,
    });

    function handOnChangeRowsPerPage(value: number) {
        handleOnChangePage(0);
        const pageValue = value as PathValue<C, Path<C>>;
        setValue(pageSize, pageValue);
    }

    function handleOnChangePage(value: number) {
        const pageNumberValue = value as PathValue<C, Path<C>>;
        setValue(pageNumber, pageNumberValue);
    }

    React.useEffect(() => {
        getList(getValues());
        handleMoreAction && handleMoreAction(getValues());
    }, []);

    React.useEffect(() => {
        if (isLoading && state.total > 0) {
            getList({ ...getValues(), sortBy, ...statusSupport });
            handleMoreAction && handleMoreAction(getValues());
        }
    }, [watch(pageSize), watch(pageNumber), sortBy]);

    const getList = React.useCallback(async (value: C) => {
        const { data } = await new Service(value);
        // console.log("hook data", data);
        if (data) {
            setImmerState((state) => {
                state.data = _get(data.result, ["content"], []);
                state.total = _get(data.result, ["totalElements"], 0);
            });
            await onLoading();
            counter = 1;
        }
    }, []);

    const handleSearch = React.useCallback(async (isReset?: boolean, addValue?: object) => {
        setStatusSupport({ ...addValue });

        if (isReset) {
            await reset();
            handleReset && handleReset();
            getList({ ...getValues(), sortBy, ...addValue });
            setStatusSupport({ ...addValue });
            handleMoreAction && handleMoreAction(getValues());
            return;
        }
        handleOnChangePage(0);
        if (watch(pageNumber) === 0) {
            getList({ ...getValues(), sortBy, ...addValue });
            handleMoreAction && handleMoreAction(getValues());
        }
    }, []);

    return {
        watch,
        getList,
        register,
        values: getValues(),
        setValue,
        isLoading,
        data: state.data,
        pageParams: {
            page: watch(pageNumber),
            rowsPerPage: watch(pageSize),
            total: state.total,
        } as Pageable,
        handleOnChangePage,
        handOnChangeRowsPerPage,
        handleSubmit: (isReset?: boolean, addValue?: object) => handleSubmit(() => handleSearch(isReset, addValue))(),
    };
}
