import React, { Component } from 'react'
import "./Joke.css"

class Joke extends Component {
    constructor(props) {
        super(props)
        this.emojiFinder = this.emojiFinder.bind(this);
    }

    emojiFinder(votes) {
        if (votes < 2) {
            return <i className="em em-angry" aria-label="ANGRY FACE"></i>
        } else if (votes < 5) {
            return <i className="em em-anguished" aria-label="ANGUISHED FACE"></i>
        } else if (votes < 8) {
            return <i className="em em-sweat_smile" aria-label="SMILING FACE WITH OPEN MOUTH AND COLD SWEAT"></i>
        }
        else if (votes < 10) {
            return <i className="em em-smiley" aria-label="SMILING FACE WITH OPEN MOUTH"></i>
        } else {
            return <i className="em em-rolling_on_the_floor_laughing" aria-label="ROLLING ON THE FLOOR LAUGHING"></i>
        }

    }

    render() {
        const smiley = this.emojiFinder(this.props.votes);
        return <div className='Joke'>
            <div className='JokeButtons'>
                <i className='fas fa-arrow-up' onClick={this.props.upVote} />
                <span className='JokeVotes' style={{ border: (this.props.votes <= 0 ? "3px solid red" : this.props.votes <= 5 ? "3px solid yellow" : this.props.votes <= 10 ? "3px solid green" : "3px solid slateblue") }}>{this.props.votes}</span>
                <i className='fas fa-arrow-down' onClick={this.props.downVote} />
            </div>
            <section className='JokeText'>{this.props.jokedisplay}</section>
            <div className='JokeSmiley'>
                {smiley}
            </div>


        </div>
    }
}
export default Joke;