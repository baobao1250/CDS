import {
    bootstrapHelperTextStyles,
    bootstrapInputAdornmentStyles,
    bootstrapInputStyles,
    bootstrapLabelLeftStyles,
    bootstrapLabelRightStyles,
    bootstrapLabelStyles,
} from "./bootstrapInputStyles";

export const bootstrapTextFieldHook = {
    useLabel: bootstrapLabelStyles,
    useInput: bootstrapInputStyles,
    useHelperText: bootstrapHelperTextStyles,
    labelLeft: bootstrapLabelLeftStyles,
    labelRight: bootstrapLabelRightStyles,
    inputAdornment: bootstrapInputAdornmentStyles,
};
// export const filledTextFieldHook = {
//     useInput: makeStyles(filledInputStyles),
//     useHelperText: makeStyles(filledHelperTextStyles),
// };