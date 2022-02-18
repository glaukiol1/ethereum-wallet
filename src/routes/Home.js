import React from 'react'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isLogged: false, hasWallet: false, balance: -1, address: '0x1' };
        this.ipc = window.api
    }

    sendIPC(message) {
        this.ipc.send("toMain", message)
    }

    reciveIPC(fn) {
        this.ipc.receive("fromMain", function(data) {
            fn(data)
        })
    }

    render() {
        return <div className="Home">
            {!this.state.isLogged ? 
            this.state.hasWallet ?
            <div className="Home">
                <h1>This is the not logged in home with a wallet</h1>
            </div>
            :
            <div className="Home">
                <h1>This is the not logged in home with no wallet</h1>
            </div>
            : 
            <div className="Home">
                <h1>This is the Home</h1>
                <h2>Address: {this.state.address}</h2>
                <h2>Balance: {this.state.balance}</h2>
            </div>
            }
            
        </div>
    }
    componentDidMount() {
        this.sendIPC({action: "hasWallet"})
        this.reciveIPC((dat) => {
            if (dat.type === 'hasWallet') {
                this.setState({hasWallet: dat.hasWallet})
            }
        })

        this.sendIPC({action: "isLoggedIn"})
        this.reciveIPC((dat) => {
            if (dat.type === 'isLoggedIn') {
                this.setState({isLogged: dat.isLoggedIn})
            }
        })
    }
}