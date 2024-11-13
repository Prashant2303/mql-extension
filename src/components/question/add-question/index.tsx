import { useContext, useEffect, useState } from 'react';
import { Grid2 as Grid, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { UserContext } from '@src/App';
import { categories, difficulties, statuses } from '@src/constants';
import { Question } from '@src/types';
import { useAPIService } from '@src/services';

export type PropTypes = {
    existingQuestion?: Question,
    setExistingQuestion: (question: Question) => void
}

export function AddQuestion(props: PropTypes) {
    const user = useContext(UserContext);
    const { addQuestion } = useAPIService();

    const initialState = {
        'id': '',
        'date': '',
        'url': '',
        'site': '',
        'name': '',
        'difficulty': user?.defaultDifficulty,
        'status': user?.defaultStatus,
        'category': user?.defaultCategory,
        'notes': ''
    };

    const initialErrors = {
        'url': '',
        'name': ''
    };

    const [state, setState] = useState<Question>(initialState);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(initialErrors);

    async function getTab() {
        const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
        const url = new URL(tab.url);
        console.log('URL', url);
        const newState = {
            ...state,
            url: url.href,
            site: url.hostname,
            name: parseName(url)
        };
        setState(newState);
    }

    useEffect(() => {
        getTab();
    }, [])

    const parseName = (url) => {
        const site = url.hostname;
        let name;
        if (site === "leetcode.com") {
            name = url.pathname.substring(10)
            name = (name[0].toUpperCase() + name.substring(1)).replaceAll('-', ' ');
        } else {
            console.log('NO LC OR GFG', url);
            name = url;
        }
        return name;
    }

    const handleUrlChange = (e) => {
        setErrors({ url: '', name: '' })
        try {
            const urlObject = new URL(e.target.value);
            const url = urlObject.href;
            const site = urlObject.hostname;
            const name = parseName(urlObject);
            setState({
                ...state,
                url,
                name,
                site
            });
        } catch (err) {
            console.log(err);
            setState({
                ...state,
                url: e.target.value
            })
            setErrors({ ...errors, url: 'Invalid URL' })
        }
    }

    const handleChange = (e) => {
        if (e.target.name === 'name') {
            setErrors({ ...errors, name: '' })
            if (e.target.value.trim() === '')
                setErrors({ ...errors, name: 'Required' })
            if (e.target.value.trim().length > 100)
                setErrors({ ...errors, name: 'Must be less than 100 characters' })
        }
        setState({ ...state, [e.target.name]: e.target.value });
    }

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    }

    const handleSubmit = async () => {
        if (!state.url.length || !state.name.length) {
            if (state.name.length) {
                setErrors({ ...errors, url: 'Required' })
            } else if (state.url.length) {
                setErrors({ ...errors, name: 'Required' })
            } else {
                setErrors({ url: 'Required', name: 'Required' })
            }
        } else {
            setLoading(true);
            const res = await addQuestion(state);
            props.setExistingQuestion(res);
            setLoading(false);
        }
    }

    return <Grid container spacing={2}>
        <Grid size={6}>
            <TextField
                id="url"
                name="url"
                label="URL"
                variant="outlined"
                placeholder="e.g - https://leetcode.com/problems/basic-calculator-ii/"
                fullWidth
                value={state.url}
                onChange={handleUrlChange}
                onKeyUp={handleEnter}
                required
                size="small"
                error={!!errors.url}
                helperText={errors.url}
                disabled={loading}
            />
        </Grid>
        <Grid size={6}>
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
                error={!!errors.name}
                helperText={errors.name}
                disabled={loading}
            />
        </Grid>
        <Grid size={4}>
            <TextField
                select
                id="difficulty"
                label="Difficulty"
                value={state.difficulty}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                disabled={loading}
                slotProps={{
                    select: {
                        native: true,
                    },
                }}
            >
                {difficulties.map((option) => (
                    <option id={option} key={option} value={option}>
                        {option}
                    </option>
                ))}
            </TextField>
        </Grid>
        <Grid size={4}>
            <TextField
                select
                id="status"
                name="status"
                label="Status"
                value={state.status}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                disabled={loading}
                slotProps={{
                    select: {
                        native: true,
                    },
                }}
            >
                {statuses.map((option) => (
                    <option id={option} key={option} value={option}>
                        {option}
                    </option>
                ))}
            </TextField>
        </Grid>
        <Grid size={4}>
            <TextField
                id="category"
                name="category"
                select
                label="Category"
                value={state.category}
                onChange={handleChange}
                fullWidth
                required
                size="small"
                disabled={loading}
                slotProps={{
                    select: {
                        native: true,
                    },
                }}
            >
                {categories.sort().map((option) => (
                    <option id={option} key={option} value={option}>
                        {option}
                    </option>
                ))}
            </TextField>
        </Grid>
        <Grid size={12}>
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
            />
        </Grid>
        <Grid size={12} >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            </div>
        </Grid>
    </Grid>
}