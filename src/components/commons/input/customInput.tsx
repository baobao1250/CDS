import { InputBase } from '@material-ui/core';
import { createStyles, Theme, withStyles } from '@material-ui/core/styles';
export const CustomInput = withStyles((theme: Theme) =>
    createStyles({
        root: {
            'label + &': {
                marginTop: theme.spacing(3),
            },
        },
        input: {
            borderRadius: 4,
            position: 'relative',
            backgroundColor: theme.palette.common.white,
            border: '1px solid #ced4da',
            fontSize: 14,
            width: '100%',
            padding: '8px 8px',
            marginLeft: '8px',
            transition: theme.transitions.create(['border-color', 'box-shadow']),
            '&:focus': {
                outline: 'none',
                borderRadius: 4,
                borderColor: "#80bdff",
                // boxShadow: `0 0 0 0.2rem ${Color(normalColor).fade(
                //     theme.palette.type === 'dark' ? 0.48 : 0.75
                // )}`,
            },
            // Use the system font instead of the default Roboto font.
            fontFamily: [
                'Arial',
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
        },
    }),
)(InputBase);
