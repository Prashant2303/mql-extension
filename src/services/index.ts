import { Question } from './../types/index';
import { useContext } from "react";
import { UserContext } from "../App";



export function useAPIService() {
    // const base_url = 'https://mql.onrender.com/api';
    const base_url = 'http://localhost:3001/api';
    const user = useContext(UserContext);
    console.log('USER in Service', user);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${user.token}`);

    return {
        checkQuestion: async (currentUrl: string): Promise<Question> => {
            console.log('Currenturl', currentUrl);

            const result = await fetch(base_url + '/check-question', {
                method: "POST",
                headers: myHeaders,
                body: JSON.stringify({
                    "selectedList": user.defaultList,
                    "clientUrl": currentUrl
                }),
                redirect: "follow"
            })
            const data = await result.json();
            console.log('DTA', data);
            return data;
        },
        addQuestion: async (question: Question): Promise<Question> => {
            console.log('Add question called', user);

            const response = await fetch(base_url + `/questions/${user.defaultList}`, {
                method: 'POST',
                body: JSON.stringify({ question: { ...question } }),
                headers: myHeaders
            });

            const data = await response.json();
            console.log('Data', data);
            return data;
        },
        updateQuestion: async (questionId, field, value): Promise<boolean> => {
            console.log(questionId, field, value);
            // const response = await fetch(base_url + `/api/questions/${user.defaultList}/${questionId}`, {
            //     method: 'PATCH',
            //     body: JSON.stringify({
            //         [field]: value
            //     }),
            //     headers: myHeaders,
            // })
            // if (response.ok) {
            //     // toast.success('Updated Successfully');
            //     return true;
            // }
            // // toast.error('Something went wrong');
            // return false;
            return true;
        },
        deleteQuestion: async (params) => {
            console.log(params);
        }
    };
}