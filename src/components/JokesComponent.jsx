import APIRequest from '../utils/axios.config';
import React, { useEffect, useState, useRef } from 'react'
import { Button, ButtonGroup, Typography } from '@mui/material';

function JokesComponent() {

    const initialValues = {
        counter: 0,
        alreadyClicked: false
    }

    const [joke, setJoke] = useState('');
    const [clicked, setClicked] = useState(true);
    const [unLikeReaction, setUnLikeReaction] = useState(initialValues);
    const [likeReaction, setLikeReaction] = useState(initialValues);

    const getJoke = async () => {
        setJoke('')
        APIRequest.get('/random').then((res) => {
            return (
                <div>
                    <p>
                        {setJoke(res.data.value)}
                    </p>
                </div>
            )
        }).catch(err => console.log(err)).finally(
            likeReaction.alreadyClicked ? setLikeReaction((prevState) => ({ ...prevState, alreadyClicked: false }))
                : unLikeReaction.alreadyClicked && setUnLikeReaction((prevState) => ({ ...prevState, alreadyClicked: false }))

        )
    }

    const addToLikeReaction = () => {
        changeReaction()
        let tempReactionValues = { ...likeReaction };
        tempReactionValues.counter = tempReactionValues.counter + 1
        tempReactionValues.alreadyClicked = true
        setLikeReaction(tempReactionValues);
    }

    const addToUnLikeReaction = () => {
        changeReaction();
        let tempReactionValues = { ...unLikeReaction };
        tempReactionValues.counter = tempReactionValues.counter + 1
        tempReactionValues.alreadyClicked = true
        setUnLikeReaction(tempReactionValues);
    }

    const changeReaction = () => {

        let likeReactionState = likeReaction.alreadyClicked;
        let unLikeReactionState = unLikeReaction.alreadyClicked;

        if (!likeReactionState && !unLikeReactionState) {
            return
        }

        let prevReaction = {}

        if (likeReactionState) {
            prevReaction = { ...unLikeReaction };
            setUnLikeReaction({
                counter: prevReaction.counter + 1,
                alreadyClicked: true
            })
            setLikeReaction((prevState) => ({ counter: prevState.counter - 1, alreadyClicked: false }));
        } else {
            prevReaction = { ...likeReaction };
            setLikeReaction({
                counter: prevReaction.counter + 1,
                alreadyClicked: true
            })
            setUnLikeReaction((prevState) => ({ counter: prevState.counter - 1, alreadyClicked: false }));
        }

    }

    const changeClickedStatus = () => {
        setClicked(!clicked);
    }

    useEffect(() => {
        getJoke()
    }, [clicked])

    return (

        <div>
            JokesComponent
            <div>
                <p>
                    {joke}
                </p>
                <Button disabled={joke === '' ? true : false} variant='contained' onClick={changeClickedStatus}>Generate Joke</Button>
            </div>
            <div>
                <ButtonGroup variant="contained" aria-label="outlined primary button group">
                    <Button disabled={likeReaction.alreadyClicked ? true : false} onClick={addToLikeReaction} color={'success'}>Like</Button>
                    <Typography>{likeReaction.counter}</Typography>
                    <Button disabled={unLikeReaction.alreadyClicked ? true : false} onClick={addToUnLikeReaction} color='error' >Dislike</Button>
                    <Typography>{unLikeReaction.counter}</Typography>
                </ButtonGroup>
            </div>
        </div>
    )
}

export default JokesComponent;