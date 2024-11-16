import { capitalize, Grid2, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { DeleteForever } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { fields } from "@src/constants";
import { useAPIService } from "@src/services";
import { Question } from "@src/types";
import { useState } from "react";
import { PropTypes } from "../add-question";

export function EditQuestion({ existingQuestion }: PropTypes) {
    console.log(existingQuestion);
    const { updateQuestion } = useAPIService();
    const [state, setState] = useState<Question>(existingQuestion);
    const [loading, setLoading] = useState<boolean>(false);

    async function handleChange(e) {
        console.dir(e.target);
        setLoading(true);
        const result = await updateQuestion(state.id, e.target.name, e.target.value);
        if (result) setState({ ...state, [e.target.name]: e.target.value });
        setLoading(false);
    }

    async function handleDelete() {
        console.log('Delete');
    }

    function handleSubmit() {
        console.log('Save');
    }

    return <Grid2 container spacing={2}>
        <Grid2 size={12} container alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{state.name}</Typography>
            <IconButton disabled={false} color='error' onClick={handleDelete}>
                <DeleteForever />
            </IconButton>
        </Grid2>
        {fields.map(field =>
            <Grid2 size={4}>
                <TextField
                    select
                    fullWidth
                    id={field.name}
                    name={field.name}
                    label={capitalize(field.name)}
                    size="small"
                    value={state[field.name]}
                    onChange={handleChange}
                    disabled={loading}
                >
                    {field.options.map(option =>
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>)}
                </TextField>
            </Grid2>
        )}
        <Grid2 size={12}>
            <TextField
                id="notes"
                name="notes"
                label="Notes (Optional)"
                minRows={6}
                multiline
                value={state.notes}
                onChange={handleChange}
                fullWidth
                disabled={loading}
            />
        </Grid2>
        <Grid2 container size={12} justifyContent="flex-end">
            <LoadingButton
                loading={false}
                variant="contained"
                disableElevation
                type="submit"
                onClick={handleSubmit}
            >
                Save
            </LoadingButton>
        </Grid2>
    </Grid2>
}
