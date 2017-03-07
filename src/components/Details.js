import React from 'react';
import axios from 'axios';
import Loading from 'react-loading';

class Details extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            id: "",
            abilities: [],
            sprites: {},
            base_experience: "",
            types: [],
            hideSpin: false,
        }
    }

    getData(base, param) {
        return new Promise(resolve => {
            let url = base + param;
            resolve(axios.get(url));
        });
    }

    changeData(newData) {
        this.searchTree(newData.abilities, this.state.abilities);
        this.searchTree(newData.types, this.state.types);

        this.setState({
            name: newData.name,
            id: newData.id,
            base_experience: newData.base_experience,
            sprites: newData.sprites.front_default,
            abilities: this.state.abilities,
            types: this.state.types,
            hideSpin: true,
        })
    }

    searchTree(el, elArray) {
        if (typeof el === "object") {
            if (el.length === undefined) {
                if (el.hasOwnProperty("name")) {
                    elArray.push(el.name);
                } else {
                    for (var prop in el) {
                        this.searchTree(el[prop], elArray);
                    }
                }
            } else if (el.length > 0) {
                for (var i = 0; i < el.length; i++) {
                    this.searchTree(el[i], elArray);
                }
            }
        }
    }

    componentDidMount() {
        let id = this.props.location.query.id;
        this.getData(`http://pokeapi.co/api/v2/pokemon/`, id).then(res => {
            this.changeData(res.data);
        }, err => {
            this.setState({ hideSpin: true, name: "Este Pokemon não existe", })
        });
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        return (<div>
            <div className="centralized" style={{ display: this.state.hideSpin ? 'none' : 'block' }}>
                <Loading type='spin' color='black' />
            </div>
            <div style={{ display: !this.state.hideSpin ? 'none' : 'block' }}>
                <div className="bFont">{this.capitalizeFirstLetter(this.state.name)}</div>
                <div className="mFont">id: {this.state.id}</div>
                <div className="mFont">Base experience: {this.state.base_experience}</div>
                <div className="center">
                    <img src={this.state.sprites} alt="" />
                </div>
                <div className="mFont">Abilities</div>
                <ul>
                    {this.state.abilities.map((item, index) => {
                        index++;
                        return <li key={index}>{item}</li>
                    })}
                </ul>

                <div className="type center">
                    {this.state.types.map((item, index) => {
                        index++;
                        return <div key={index} className="type center"><div className={item} >{item}</div></div>
                    })}
                </div>
            </div>
        </div>);
    }
}

export default Details;