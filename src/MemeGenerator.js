import React, {Component} from "react";

class MemeGenerator extends Component {

    state= {
        topText: "",
        bottomText: "",
        customUrl:"",
        randomImg: "http://i.imgflip.com/1bij.jpg",
        allMemeImgs: []
    }   

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json()) 
            .then(response =>{
                const {memes} = response.data
                this.setState({allMemeImgs: memes})
            }
        )
    }

    handleChange = (event) => {
        const {name, value} = event.target
        this.setState ({ [name]: value })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg =  this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg})
    }

    handleCustom = (event) => {
        event.preventDefault()
        const randMemeImg = this.state.customUrl
        this.setState({ randomImg: randMemeImg})
    }

    render(){
        return(
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                
                    <input 
                        class="topText"
                        type="text"
                        name="topText"
                        value={this.state.topText}
                        onChange={this.handleChange}
                        placeholder="Top text"
                    />
                    
                    <input
                        type="text"
                        name="bottomText"
                        value={this.state.bottomText}
                        onChange={this.handleChange}
                        placeholder= "Bottom text"
                    />

                    <button className="meme-button">Generate</button>
                    
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>

                <form className="url-form" onSubmit={this.handleCustom}>
                    <input
                    type="text"
                    name="customUrl"
                    value={this.state.customUrl}
                    onChange={this.handleChange}
                    placeholder="Image Address"
                    ></input>
                    <button className="meme-button">Customize</button>
                </form>

            </div>
        )   
    }
}

export default MemeGenerator;