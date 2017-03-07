import React, { Component, } from "react";
import { Link } from 'react-router'

export default class List extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    managePokeUrl(url) {
        let array = url.split("/");
        let id = array.length;
        id = id - 2;
        id = array[id];
        return id;
    }


    render() {
        return (<div>
            {this.props.data.map((item, index) => {
                index++;
                return <div key={index} data-id={item}>
                    <Link to={'/pokemon/?id=' + this.managePokeUrl(item.url)}>{this.capitalizeFirstLetter(item.name)}</Link>
                </div>
            })
            }
        </div>);
    }

}

// ReactDOM.render(<List data={data} />, document.body);