import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { balance: -1, address: '0x1' };
    }

    sendIPC(message) {
        window.api.send("toMain", message)
    }

    render() {
        return <div className="Home">
            <h1>This is the Home</h1>
            <h2>Address: {this.state.address}</h2>
            <h2>Balance: {this.state.balance}</h2>
        </div>
    }
    
    componentDidMount() {
        this.sendIPC('hello')
    }
}