import { LoadingButton } from "@mui/lab";
import { Button, Grid2, Modal, Paper, Typography } from "@mui/material";
import { useAPIService } from "@src/services";
import { Question } from "@src/types";
import { useState } from "react";

type Props = {
    open: boolean
    questionId: string
    setOpen: (boolean) => void
    setExistingQuestion: (question: Question) => void
}

export function DeleteModal(props: Props) {
    const { open, questionId, setOpen, setExistingQuestion } = props;

    const { deleteQuestion } = useAPIService();

    const [loading, setLoading] = useState<boolean>(false);

    async function handleDelete() {
        setLoading(true);
        const res = await deleteQuestion(questionId);
        if (res) setExistingQuestion(null);
        else setLoading(false);
    }

    return <Modal open={open}>
        <Grid2 container justifyContent="center" alignItems="center" height="100%">
            <Paper sx={{ padding: '20px' }}>
                <Typography id="transition-modal-title" variant="h6" textAlign="center">
                    Delete this question ?
                </Typography>
                <Typography id="transition-modal-description" sx={{ mt: 2 }} textAlign="center">
                    This action is non reversible.
                </Typography>
                <Grid2 container marginTop={3} justifyContent="space-evenly">
                    <Button disableElevation variant="contained" color="info" onClick={() => setOpen(false)}>Cancel</Button>
                    <LoadingButton disableElevation variant="contained" color="error" loading={loading} onClick={handleDelete}>Delete</LoadingButton>
                </Grid2>
            </Paper>
        </Grid2>
    </Modal>
}