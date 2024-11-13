import { Grid2, MenuItem, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { categories, difficulties, statuses } from "@src/constants";
import { useAPIService } from "@src/services";
import { Question } from "@src/types";
import { useState } from "react";
import { PropTypes } from "../add-question";

export function EditQuestion({ existingQuestion }: PropTypes) {
    console.log(existingQuestion);
    const { updateQuestion } = useAPIService();
    const [state,] = useState<Question>(existingQuestion);
    // const [loadingDelete, setLoadingDelete] = useState(false);
    // const [loadingStatus, setLoadingStatus] = useState(false);
    // const [loadingDifficulty, setLoadingDifficulty] = useState<boolean>(false);

    async function handleChange(e) {
        console.log('Event', e);
        updateQuestion({});
        // if (e.target.name === 'status') {
        //     setLoadingStatus(true);
        // } else {
        //     setLoadingDifficulty(true);
        // }

        // const result = await updateQuestion(state.id, e.target.name, e.target.value);
        // if (result) setState({ ...state, [e.target.name]: e.target.value });

        // if (e.target.name === 'status') {
        //     setLoadingStatus(false);
        // } else {
        //     setLoadingDifficulty(false);
        // }
    }

    function handleSubmit() {
        console.log('Save');
    }

    return <Grid2 container spacing={2}>
        <Grid2 size={12}>
            <Typography variant="h6">{state.name}</Typography>
        </Grid2>
        <Grid2 size={4}>
            <TextField
                select
                fullWidth
                size="small"
                id="difficulty"
                label="Difficulty"
                defaultValue={state.difficulty}
                onChange={handleChange}
            >
                {difficulties.map(difficulty =>
                    <MenuItem key={difficulty} value={difficulty}>
                        {difficulty}
                    </MenuItem>)}
            </TextField>
        </Grid2>
        <Grid2 size={4}>
            <TextField
                select
                fullWidth
                size="small"
                id="status"
                label="Status"
                defaultValue={state.status}
                onChange={handleChange}
            >
                {statuses.map(status =>
                    <MenuItem key={status} value={status}>
                        {status}
                    </MenuItem>)}
            </TextField>
        </Grid2>
        <Grid2 size={4}>
            <TextField
                select
                fullWidth
                id="category"
                label="Category"
                size="small"
                defaultValue={state.category}
                onChange={handleChange}>
                {categories.map(category =>
                    <MenuItem key={category} value={category}>
                        {category}
                    </MenuItem>)}
            </TextField>
        </Grid2>
        <Grid2 size={12}>
            <TextField
                id="notes"
                name="notes"
                label="Notes (Optional)"
                minRows={7}
                multiline
                value={state.notes}
                // onChange={handleChange}
                fullWidth
            // size="small"
            // disabled={loading}
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
