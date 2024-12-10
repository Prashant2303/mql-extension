import { Question } from "@src/types";
import { useContext } from "react";
import { UserContext } from "../App";
import toast from 'react-hot-toast';

export function useAPIService() {
    const base_url = 'https://mql.onrender.com/api';

    const { defaultList, token } = useContext(UserContext);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${token}`);

    return {
        checkQuestion: async (currentUrl: string): Promise<Question> => {
            const result = await fetch(base_url + '/check-question', {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    "selectedList": defaultList,
                    "clientUrl": currentUrl
                }),
                redirect: "follow"
            })
            const question = await result.json();
            if (question) {
                toast.success('Question exists');
            } else {
                toast.error("Question doesn't exist");
            }
            return question;
        },
        addQuestion: async (question: Question): Promise<Question> => {
            const response = await fetch(base_url + `/questions/${defaultList}`, {
                method: 'POST',
                body: JSON.stringify({ question: { ...question } }),
                headers: myHeaders
            });

            const data = await response.json();
            if (question) {
                toast.success('Question added succesfully');
            } else {
                toast.error('Something went wrong');
            }
            return data;
        },
        updateQuestion: async (questionId, field, value): Promise<boolean> => {
            const response = await fetch(base_url + `/questions/${defaultList}/${questionId}`, {
                method: 'PATCH',
                body: JSON.stringify({
                    [field]: value
                }),
                headers: myHeaders,
            })
            if (response.ok) {
                toast.success('Updated Successfully');
                return true;
            }
            toast.error('Something went wrong');
            return false;
        },
        deleteQuestion: async (questionId: string): Promise<boolean> => {
            const response = await fetch(base_url + `/questions/${defaultList}/${questionId}`, {
                method: 'DELETE',
                headers: myHeaders,
            });
            if (response.ok) {
                toast.success('Deleted Successfully');
                return true;
            }
            toast.error('Something went wrong');
            return false;
        }
    };
}