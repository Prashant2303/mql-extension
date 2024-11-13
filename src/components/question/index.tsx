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

    function renderAddQuestion() {
        return <AddQuestion currentUrl={currentUrl} setExistingQuestion={setExistingQuestion} />;
    }

    function renderEditQuestion() {
        return <EditQuestion existingQuestion={existingQuestion} setExistingQuestion={setExistingQuestion} />;
    }

    return <Paper className="question" elevation={3}>
        {loading ? <CircularProgress /> :
            existingQuestion ? renderEditQuestion() : renderAddQuestion()}
    </Paper>
}