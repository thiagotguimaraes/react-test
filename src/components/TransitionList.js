import React from 'react';
import Item from './Item';

class TransitionList extends React.Component {

    constructor(props) {
        super(props);

        this.removeItem = this.removeItem.bind(this)


        this.state = {
            items: [
                { name: 'thiago' },
                { name: 'giulia' },
                { name: 'toledo' },
                { name: 'teleza' },
                { name: 'victor' },
            ]
        };
    }

    componentDidMount() {
    }

    removeItem(index) {
        console.log("removing item")
        this.setState({
            items: this.state.items.filter((item, i) => i != index)
        })
    }


    render() {
        let { items } = this.state

        return (
            <div>
                {items.map((item, i) =>
                    <Item key={item.name} index={i} name={item.name} onRemove={this.removeItem}></Item>
                )}
            </div>
        );
    }
}


export default TransitionList;