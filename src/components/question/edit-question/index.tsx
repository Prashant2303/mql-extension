import { capitalize, Grid2, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import DeleteForever from "@mui/icons-material/DeleteForever";
import { LoadingButton } from "@mui/lab";
import { fields } from "@src/constants";
import { useAPIService } from "@src/services";
import { Question } from "@src/types";
import { useState } from "react";
import { PropTypes } from "../add-question";
import { DeleteModal } from "./delete-modal";

function getDate(ISODate: string): string {
    const date = new Date(ISODate);
    return `Added: ${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
}

export function EditQuestion({ existingQuestion, setExistingQuestion }: PropTypes) {

    const { updateQuestion } = useAPIService();
    const [state, setState] = useState<Question>(existingQuestion);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);

    async function handleChange(e) {
        if (e.target.name === "notes") {
            setState({ ...state, notes: e.target.value });
        } else {
            setLoading(true);
            const result = await updateQuestion(state.id, e.target.name, e.target.value);
            if (result) setState({ ...state, [e.target.name]: e.target.value });
            setLoading(false);
        }
    }

    async function handleSubmit() {
        setLoading(true);
        const res = await updateQuestion(state.id, "notes", state.notes);
        if (res) setExistingQuestion({ ...existingQuestion, notes: state.notes });
        setLoading(false);
    }

    return <Grid2 container spacing={2}>
        <Grid2 size={12} container alignItems="center" justifyContent="space-between">
            <Grid2 size={11}>
                <Typography variant="h6">{state.name}</Typography>
            </Grid2>
            <Grid2 size={1}>
                <IconButton disabled={false} color='error' title="Delete" onClick={() => setOpen(true)}>
                    <DeleteForever />
                </IconButton>
            </Grid2>
            <DeleteModal questionId={state.id} setExistingQuestion={setExistingQuestion} open={open} setOpen={setOpen} />
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
                minRows={5}
                multiline
                value={state.notes}
                onChange={handleChange}
                fullWidth
                disabled={loading}
            />
        </Grid2>
        <Grid2 container size={12} justifyContent="space-between" alignItems="center">
            <Typography variant="caption">{getDate(existingQuestion.date)}</Typography>
            <LoadingButton
                loading={loading}
                variant="contained"
                disableElevation
                type="submit"
                onClick={handleSubmit}
                disabled={existingQuestion.notes == state.notes}
            >
                Save
            </LoadingButton>
        </Grid2>
    </Grid2>
}
