import './style.css';
import { useAPIService } from "@src/services";
import { useEffect, useState } from "react";
import { AddQuestion } from "./add-question";
import { EditQuestion } from "./edit-question";
import { CircularProgress, Paper } from "@mui/material";
import { Question } from "@src/types";

export function QuestionSection({ currentUrl }: { currentUrl: string }) {

    const { checkQuestion } = useAPIService();
    const [existingQuestion, setExistingQuestion] = useState<Question>(null);
    const [loading, setLoading] = useState<boolean>(false);

    async function checkIfExists() {
        setLoading(true);
        const res = await checkQuestion(currentUrl);
        if (res) setExistingQuestion(res);
        setLoading(false);
    }

    useEffect(() => {
        checkIfExists();
    }, [])
    return <Paper className="question" elevation={3}>
        {loading ? <CircularProgress /> :
            existingQuestion ? <EditQuestion existingQuestion={existingQuestion} setExistingQuestion={setExistingQuestion} /> :
                <AddQuestion setExistingQuestion={setExistingQuestion} />}
    </Paper>
}