import { useContext, useRef, useState } from 'react';
import { capitalize, Grid2, MenuItem, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UserContext } from '@src/App';
import { fields } from '@src/constants';
import { Question } from '@src/types';
import { useAPIService } from '@src/services';
import { parseName } from '@src/utils';

export type PropTypes = {
    currentUrl?: string
    existingQuestion?: Question
    setExistingQuestion: (question: Question) => void
}

export function AddQuestion(props: PropTypes) {
    const { currentUrl, setExistingQuestion } = props;
    const { addQuestion } = useAPIService();
    const user = useContext(UserContext);
    const notesRef = useRef(null);

    const url = new URL(currentUrl);

    const initialState = {
        'id': '',
        'date': '',
        'url': url.href,
        'site': url.hostname,
        'name': parseName(url),
        'difficulty': user?.defaultDifficulty,
        'status': user?.defaultStatus,
        'category': user?.defaultCategory,
        'notes': ''
    };

    const [state, setState] = useState<Question>(initialState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    function handleChange(e) {
        console.dir(e.target);
        const field = e.target.name;
        const value = e.target.value;

        if (field === 'name') {
            setError('');
            if (value.trim() === '')
                setError('Required');
            if (value.trim().length > 100)
                setError('Must be less than 100 characters');
        }
        setState({ ...state, [field]: value });
    }

    function handleEnter(e) {
        if (e.key === 'Enter') {
            notesRef.current.focus();
        }
    }

    async function handleSubmit() {
        if (!state.name.length) {
            setError('Required');
        } else {
            setLoading(true);
            const res = await addQuestion(state);
            setExistingQuestion(res);
            setLoading(false);
        }
    }

    return <Grid2 container spacing={2}>
        <Grid2 size={12}>
            <TextField
                id="url"
                label="URL (Not editable)"
                variant="outlined"
                fullWidth
                value={state.url}
                required
                size="small"
                slotProps={{
                    input: {
                        readOnly: true
                    }
                }}
            />
        </Grid2>
        <Grid2 size={12}>
            <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                value={state.name}
                onChange={handleChange}
                onKeyUp={handleEnter}
                required
                size="small"
                error={!!error}
                helperText={error}
                disabled={loading}
            />
        </Grid2>
        {fields.map(field => <Grid2 size={4}>
            <TextField
                id={field.name}
                name={field.name}
                select
                label={capitalize(field.name)}
                value={state[field.name]}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                disabled={loading}
            >
                {field.options.map(option =>
                    <MenuItem id={option} key={option} value={option}>
                        {option}
                    </MenuItem>
                )}
            </TextField>
        </Grid2>)}
        <Grid2 size={12}>
            <TextField
                id="notes"
                name="notes"
                label="Notes (Optional)"
                minRows={4}
                multiline
                value={state.notes}
                onChange={handleChange}
                fullWidth
                size="small"
                disabled={loading}
                inputRef={notesRef}
            />
        </Grid2>
        <Grid2
            size={12}
            container
            justifyContent="space-between"
            alignItems="center"
        >
            <Typography component="i">
                * Will be added to the default list
            </Typography>
            <LoadingButton
                loading={loading}
                variant="contained"
                disableElevation
                type="submit"
                onClick={handleSubmit}
            >
                Add Question
            </LoadingButton>
        </Grid2>
    </Grid2>
}
