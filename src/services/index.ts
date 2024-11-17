import { Question } from "@src/types";
import { useContext } from "react";
import { UserContext } from "../App";
import toast from 'react-hot-toast';

export function useAPIService() {
    // const base_url = 'https://mql.onrender.com/api';
    const base_url = 'http://localhost:3001/api';
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
            return await result.json();
        },
        addQuestion: async (question: Question): Promise<Question> => {
            const response = await fetch(base_url + `/questions/${defaultList}`, {
                method: 'POST',
                body: JSON.stringify({ question: { ...question } }),
                headers: myHeaders
            });

            const data = await response.json();
            console.log('Data', data);
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