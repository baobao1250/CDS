import { TextField } from "@mui/material";
import { withStyles } from "@mui/styles";

export const InputField = withStyles({
	root: {
		borderRadius: "2px",
		boder: "none",
		"& .MuiOutlinedInput-input": {
			padding: "8px 14px",
			backgroundColor: "#FFF",
			fontFamily: "Roboto",
			borderRadius: "2px",
			boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.25)",
		},
		"& label.Mui-focused": {
			color: "#D7D7D7",
			boder: "none",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "transparent",
			boder: "none",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "transparent",
				borderRadius: "2px",
			},
			"&:hover fieldset": {
				borderColor: "transparent",
			},
			"&.Mui-focused fieldset": {
				borderColor: "transparent",
			},
		},
	},
})(TextField);
