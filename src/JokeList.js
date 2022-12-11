import React, { Component } from 'react'
import axios from 'axios';
import './JokeList.css'
class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    }
    constructor(props) {
        super(props);
        this.state = {
            jokes: [],
            refreshToggle: true

        }
        this.handleClick = this.handleClick.bind(this);
    }

    async componentDidMount() {
        let jokes = [];
        while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get('https://icanhazdadjoke.com/', { headers: { Accept: "application/json" } })
            let joke = { joke: res.data.joke, votes: 0 }
            jokes.push(joke)
        }
        this.setState({
            jokes: jokes
        })

    }
    handleClick() {
        this.setState({ refreshToggle: !this.state.refreshToggle })

    }
    render() {
        let jokes = this.state.jokes.map(jk => <div>{jk.joke}- {jk.votes}</div>)
        return <div className='JokeList'>
            <div className='JokeList-sidebar'> <h1 className='JokeListTitle'><span>Dad</span> Jokes</h1>
                <img className='JokeListImage' src='https://i.pinimg.com/originals/d5/9c/90/d59c9002030448f1193adf7d7600a52a.png' />
                <button className='JokeListButton' onClick={this.handleClick}>New Jokes</button>
            </div>

            <div className='JokeList-jokes'>
                {jokes}</div>


        </div>
    }
}
export default JokeList;