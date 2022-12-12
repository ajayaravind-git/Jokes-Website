import React, { Component } from 'react'
import axios from 'axios';
import './JokeList.css'
import Joke from './Joke';
class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: JSON.parse(window.localStorage.getItem("jokes")) || [],
            refreshToggle: true

        }
        this.handleClick = this.handleClick.bind(this);

    }

    componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();


    }

    async getJokes() {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: "application/json" } })
            let joke = { joke: res.data.joke, votes: 0, id: res.data.id }
            jokes.push(joke)
        }
        this.setState(st => ({
            jokes: [...st.jokes, ...jokes]

        }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)))


    }

    changeVotes(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j => j.id === id ? { ...j, votes: j.votes + delta } : j)
        }), () => window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes)));

    }

    handleClick() {
        this.getJokes();

    }
    render() {

        let jokes = this.state.jokes.map(jk => <Joke jokedisplay={jk.joke} key={jk.id} downVote={() => this.changeVotes(jk.id, -1)} upVote={() => this.changeVotes(jk.id, +1)} id={jk.id} votes={jk.votes} />)
        return <div className='JokeList'>
            <div className='JokeList-sidebar'> <h1 className='JokeListTitle'><span>Dad</span> Jokes</h1>
                <img className='JokeListImage' src='https://i.pinimg.com/originals/d5/9c/90/d59c9002030448f1193adf7d7600a52a.png' />
                <button className='JokeListButton' onClick={this.handleClick}>New Jokes</button>

            </div>

            <div className='JokeList-jokes'>
                {jokes}
            </div>


        </div>
    }
}
export default JokeList;