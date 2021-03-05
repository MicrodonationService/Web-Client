import ReactDOM from 'react-dom';
import React from 'react';
class Checkverificationmail extends React.Component{
    
    render(){    
        return (
            <div>
                <center>
                    <h1>
                        Please Check your Mail {this.props.data} for the Verification link and click on that!
                    </h1>
                </center>
            </div>
        )
    }

}
export default Checkverificationmail;