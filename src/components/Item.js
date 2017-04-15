import React from 'react';
import cx from 'classnames';


class Item extends React.Component {

    constructor(props) {
        super(props);
        this.onClickRemove = this.onClickRemove.bind(this);
        let { name } = this.props

        this.state = {
            name: name,
            mounted: false
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                mounted: true
            })
        }, 600);
    }

    componentWillUnmount() {
        console.log("WILL UNMOUNT");
    }

    onClickRemove(index) {
        this.setState({
            mounted: false
        })
        let { onRemove } = this.props
        setTimeout(() => {
            onRemove(index)
        }, 600);
    }


    render() {
        let { index } = this.props
        let { name, mounted } = this.state

        let cls = cx({
            'item': true,
            'mounted': mounted
        })

        return (
            <div className={cls}>{name}<span onClick={() => this.onClickRemove(index)} className="delete">delete</span></div>
        );
    }
}


export default Item;