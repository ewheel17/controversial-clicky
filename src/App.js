import React, { Component } from 'react';
import './App.css';
import faces from './faces.json';
import Wrapper from './components/Wrapper';
import Navpills from './components/Navpills';
import Title from './components/Title';
import Card from './components/Card';

class App extends Component {
    state = {
        message: "Click on an image to begin!",
        topScore: 0,
        currentScore: 0,
        faces: faces,
        unselectedFaces: faces
    }

    componentDidMount() {
    }

    shuffleArray = array => {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    selectFace = name => {
        const findFace = this.state.unselectedFaces.find(item => item.name === name);

        if(findFace === undefined) {
            this.setState({
                message: "WRONG!",
                topScore: (this.state.currentScore > this.state.topScore) ? this.state.currentScore : this.state.topScore,
                currentScore: 0,
                faces: faces,
                unselectedFaces: faces
            });
        }
        else {
            const newFaces = this.state.unselectedFaces.filter(item => item.name !== name);

            this.setState({
                message: "Bigly!",
                currentScore: this.state.currentScore + 1,
                faces: faces,
                unselectedFaces: newFaces
            });
        }

        this.shuffleArray(faces);
    };

    render() {
        return (
            <Wrapper>
                <Navpills
                    message={this.state.message}
                    currentScore={this.state.currentScore}
                    topScore={this.state.topScore}
                />
                <Title />
                {
                    this.state.faces.map(face => (
                        <Card
                            name={face.name}
                            image={face.image}
                            selectFace={this.selectFace}
                            currentScore={this.state.currentScore}
                        />
                    ))
                }
            </Wrapper>
        );
    }
}

export default App;
