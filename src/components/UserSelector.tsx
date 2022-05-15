import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { UserContext } from "common/context/UserContext";

const filterer = createFilterOptions<UserOptionType>();

export default function FreeSoloCreateOption() {
    const [value, setValue] = React.useState<UserOptionType | null>(null);

    const { userList, defineUserList } = React.useContext(UserContext);

    return (
        <Autocomplete
            value={value}
            onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                    setValue({
                        label: newValue,
                        value: newValue
                    });
                } else if (newValue && newValue.label) {
                    const newItem = {
                        label: newValue.label,
                        value: newValue.label
                    };
                    defineUserList(newItem);
                } else {
                    setValue(newValue);
                }
            }}
            filterOptions={(options, params) => {
                const filtered = filterer(options, params);

                const { inputValue } = params;
                // Suggest the creation of a new value
                const isExisting = options.some(
                    (option) => inputValue === option.value
                );
                if (inputValue !== "" && !isExisting) {
                    filtered.push({
                        label: inputValue,
                        value: `Add "${inputValue}"`
                    });
                }

                return filtered;
            }}
            selectOnFocus
            id="free-solo-with-text-demo"
            options={userList}
            getOptionLabel={(option) => {
                // Value selected with enter, right from the input

                if (typeof option === "string") {
                    const newItem = {
                        label: option,
                        value: option
                    };
                    defineUserList(newItem);

                    return option;
                }
                // Add "xxx" option created dynamically
                if (option.label) {
                    return option.label;
                }
                // Regular option

                return option.value;
            }}
            renderOption={(props, option) => <li {...props}>{option.value}</li>}
            sx={{ width: 300 }}
            freeSolo
            renderInput={(params) => (
                <TextField {...params} label="Wallet List" />
            )}
        />
    );
}

interface UserOptionType {
    value: string;
    label: string;
}
