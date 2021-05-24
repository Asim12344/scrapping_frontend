import React, { Component } from 'react';
import './Auctions.css';
import Loader from "react-loader-spinner";
// import { stockData } from "../../stocks"
import axios from '../../axios';
// import { connect } from 'react-redux';
// import * as actionCreators from '../../store/actions/index';
// import Alert from '../../components/Alert'
import image from '../../assets/noimage.png'

class Auctions extends Component {

    state = {
        auctions: [],
        auctions_s: [],
        auctions_r: [],
        auctions_m: [],
        auctions_o: [],
        seconds: [],
        seconds_r: [],
        seconds_s: [],
        loader: true,
        timer: 0
    }

    

    convertTimeToSeconds = (auctions) => {
        var seconds = []
        for(let i = 0 ; i < auctions.length ; i++){
            var timer = auctions[i]['remaining_time']
            var hms = ""
            timer = timer.split(' ')
            console.log(timer)
            if (timer.length == 3){
                hms = timer[0].substring(0,2) + ":" + timer[1].substring(0,2) + ":" + timer[2].substring(0,2)
            }
            if (timer.length == 2){
                hms = "00" + ":" + timer[0].substring(0,2) + ":" + timer[1].substring(0,2)
            }
            if (timer.length == 1){
                hms = "00" + ":" + "00" + ":" + timer[0].substring(0,2)
            }
            var a = hms.split(':'); // split it at the colons
            var second = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
            seconds.push(second)
        }
        console.log(seconds)

        this.setState({seconds:seconds})
        for(let i = 0 ; i < seconds.length ; i++){
            this.timer(i)
        }

    }

    convertTimeToSeconds_s = (auctions) => {
        var seconds = []
        for(let i = 0 ; i < auctions.length ; i++){
            var timer = auctions[i]['remaining_time']
            var hms = ""
            timer = timer.split(' ')
            console.log(timer)
            if (timer.length == 4){
                var days = timer[0].slice(0,-1)
                var hours = timer[1].slice(0,-1)
                var min = timer[2].slice(0,-1)
                var sec = timer[3].slice(0,-1)
                hms = days + ":" + hours + ":" + min+ ":" + sec
                var a = hms.split(':'); // split it at the colons
                var second = (+a[0])*24*60*60 + (+a[1]) * 60 * 60 + (+a[2]) * 60 + (+a[3]); 
                var obj = {index: i , second: second}
                seconds.push(obj)
            }
        }
        console.log(seconds)

        this.setState({seconds_s:seconds})
        for(let i = 0 ; i < seconds.length ; i++){
            console.log(seconds[i]['index'])
            this.timer_s(seconds[i]['index'],i)
        }
        
    }

    convertTimeToSeconds_r = (auctions) => {
        var seconds = []
        for(let i = 0 ; i < auctions.length ; i++){
            var timer = auctions[i]['remaining_time']
            var hms = ""
            timer = timer.split(' ')
            console.log(timer)
            if (timer.length == 4){
                var days = timer[0].slice(0,-1)
                hms = days + ":" + timer[1].substring(0,2) + ":" + timer[2].substring(0,2)+ ":" + timer[3].substring(0,2)
            }
            if (timer.length == 3){
                hms = "00:" + timer[0].substring(0,2) + ":" + timer[1].substring(0,2) + ":" + timer[2].substring(0,2)
            }
            if (timer.length == 2){
                hms = "00:" + "00" + ":" + timer[0].substring(0,2) + ":" + timer[1].substring(0,2)
            }
            if (timer.length == 1){
                hms = "00:" + "00" + ":" + "00" + ":" + timer[0].substring(0,2)
            }
            var a = hms.split(':'); // split it at the colons
            var second = (+a[0])*24*60*60 + (+a[1]) * 60 * 60 + (+a[2]) * 60 + (+a[3]); 
            seconds.push(second)
        }
        console.log(seconds)

        this.setState({seconds_r:seconds})
        for(let i = 0 ; i < seconds.length ; i++){
            this.timer_r(i)
        }

    }

    componentDidMount(){

        this.auctions_superrare()
        axios.get('api/auctions_foundation', {
            params: {
                companyName:"scrapping",
            }
        })
        .then(res => {
           console.log("res = ", res)
           console.log("auctions = " , res['data']['auctions'])
           this.setState({auctions: res['data']['auctions']})
           this.convertTimeToSeconds( res['data']['auctions'])
        })
        .catch(err => {
            console.log("error = " , err)
        })  
        this.auctions_raricle()
        this.auctions_makersplace()
        this.auctions_opensea()
       
    }

    auctions_opensea = () =>{
        console.log("auctions_opensea")
        axios.get('api/auctions_opensea', {
            params: {
                companyName:"scrapping",
            }
        })
        .then(res => {
           console.log("res = ", res)
           console.log("auctions 1 = " , res['data']['auctions'])
           
           this.setState({auctions_o: res['data']['auctions']})
            
        })
        .catch(err => {
            console.log("error = " , err)
        })  
    }

    auctions_makersplace = () => {
        console.log("auctions_makersplace")
        axios.get('api/auctions_makersplace', {
            params: {
                companyName:"scrapping",
            }
        })
        .then(res => {
           console.log("res = ", res)
           console.log("auctions 1 = " , res['data']['auctions'])
           
           this.setState({auctions_m: res['data']['auctions']})
            
        })
        .catch(err => {
            console.log("error = " , err)
        })  
    }

    auctions_superrare = () => {
        console.log("auctions_superrare")
        axios.get('api/auctions_superrare', {
            params: {
                companyName:"scrapping",
            }
        })
        .then(res => {
           console.log("res = ", res)
           console.log("auctions 1 = " , res['data']['auctions'])
           
            this.setState({auctions_s: res['data']['auctions']})
            this.convertTimeToSeconds_s( res['data']['auctions'])
            
        })
        .catch(err => {
            console.log("error = " , err)
        })  
    }

    auctions_raricle = () => {
        console.log("auctions_rarible")
        axios.get('api/auctions_rarible', {
            params: {
                companyName:"arcpie",
            }
        })
        .then(res => {
           console.log("res = ", res)
           console.log("auctions 2 = " , res['data']['auctions'])
           
            this.setState({auctions_r: res['data']['auctions']})
            this.convertTimeToSeconds_r( res['data']['auctions'])
        })
        .catch(err => {
            console.log("error = " , err)
        })  
    }

    pad = (n) => {
        return (n < 10 ? "0" + n : n);
    }

    timer_s = (index1,index2) => {
        console.log("index = " , index1)
        var auctions = this.state.auctions_s
        var seconds = this.state.seconds_s[index2]['second']
        var second_array = this.state.seconds_s
        if(seconds > 0)
		{	
            console.log(seconds)
            var x = setInterval(() => {
                var days = Math.floor(seconds/24/60/60);
                var hoursLeft = Math.floor((seconds) - (days*86400));
                var hours = Math.floor(hoursLeft/3600);
                var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
                var minutes = Math.floor(minutesLeft/60);
                var remainingSeconds = seconds % 60;
                if (seconds == 0) {
                    console.log("if")
                    auctions[index1]['remaining_time'] = "Auction has ended"
                    this.setState({auctions_s:auctions, seconds_r: second_array})
                    clearInterval(x)
                } 
                else {
                    seconds--;
                    second_array[index2] = {index:index1, second: seconds}
                    auctions[index1]['remaining_time'] = this.pad(days) + ":" + this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(remainingSeconds)
                    this.setState({auctions_s:auctions, seconds_s: second_array})
                }

                
            }, 1000);
        }
        else{
            clearInterval(x)
        }
    }
    timer_r = (index) => {
        console.log("index = " , index)
        var auctions = this.state.auctions_r
        var seconds = this.state.seconds_r[index]
        var second_array = this.state.seconds_r

        if(seconds > 0)
		{	
            console.log(seconds)
            var x = setInterval(() => {
                var days = Math.floor(seconds/24/60/60);
                var hoursLeft = Math.floor((seconds) - (days*86400));
                var hours = Math.floor(hoursLeft/3600);
                var minutesLeft = Math.floor((hoursLeft) - (hours*3600));
                var minutes = Math.floor(minutesLeft/60);
                var remainingSeconds = seconds % 60;
                if (seconds == 0) {
                    console.log("if")
                    auctions[index]['remaining_time'] = "Auction has ended"
                    this.setState({auctions_r:auctions, seconds_r: second_array})
                    clearInterval(x)
                } 
                else {
                    seconds--;
                    second_array[index] = seconds
                    auctions[index]['remaining_time'] = this.pad(days) + ":" + this.pad(hours) + ":" + this.pad(minutes) + ":" + this.pad(remainingSeconds)
                    this.setState({auctions_r:auctions, seconds_r: second_array})
                }

                
            }, 1000);
        }
        else{
            clearInterval(x)
        }


    }
    timer = (index) => {
        console.log("index = " , index)
        var auctions = this.state.auctions
        var seconds = this.state.seconds[index]
        var second_array = this.state.seconds

		if(seconds > 0)
		{	
            console.log(seconds)
            
            var x = setInterval(() => {
                console.log("call")
                console.log(seconds)
                var minutes = Math.round((seconds - 30)/60);
                var remainingSeconds = seconds % 60;
                var hour   =Math.floor((minutes)/60);
                minutes = minutes%60;

                

                if (remainingSeconds < 10) {
                    remainingSeconds = "0" + remainingSeconds;
                }
                hour = ("0" + hour).slice(-2);
                minutes = ("0" + minutes).slice(-2);
                remainingSeconds= ("0" + remainingSeconds).slice(-2);
                console.log(hour)
                console.log(minutes)
                console.log(remainingSeconds)
        
                if (seconds == 0) {
                    console.log("if")
                    auctions[index]['remaining_time'] = "Auction has ended"
                    this.setState({auctions:auctions, seconds: second_array})
                    clearInterval(x)
                } else {
                    console.log("else")
                    seconds--;
                    second_array[index] = seconds
                    auctions[index]['remaining_time'] = hour +"h" + " " + minutes + "m" + " " + remainingSeconds + "s"
                    this.setState({auctions:auctions, seconds: second_array})
                    
                }
            }, 1000);

	    }
        else{
            clearInterval(x)
        }

    }
    detail = (link) => {
        console.log("detail")
        const newWindow = window.open(link, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
    }


    render(){
        // console.log("render = " , this.state.auctions)
        return(
            <div className="container m-t-50">
               {/* <h1> Auctions </h1> */}
               {this.state.auctions_o.length >  0 && (
                   <div className="row">
                        {this.state.auctions_o.map((obj,index) => {
                            
                            return(
                                <div key={index} className="col-md-4 m-b-20" onClick={() => this.detail(obj['permalink'])}>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h3>OpenSea</h3> 
                                        </div>
                                            {obj['image_url'] == "" && (
                                                <img className="card-img-top" src={obj['asset_contract']['image_url']} />  
                                            )}
                                             {obj['image_url'] != "" && (
                                                <img className="card-img-top" src={obj['image_url']} /> 
                                            )}    
                                        <div className="card-body">
                                            <h5 className="card-title">{obj['asset_contract']['name']}</h5>
                                            <p className="card-text " style={{fontWeight:'500'}}>
                                                {obj['name']}
                                            </p>
                                        </div>
                                        <div className="card-footer background">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="p-styling">Posted</p> 
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="p-styling">{obj['asset_contract']['created_date'].substring(0,10)}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                            )
                        })}
                    </div>
               )}
               {this.state.auctions_m.length >  0 && (
                   <div className="row">
                        {this.state.auctions_m.map((obj,index) => {
                            
                            return(
                                <div key={index} className="col-md-4 m-b-20" onClick={() => this.detail(obj['link'])}>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h3>Makersplace</h3> 
                                        </div>
                                           <img className="card-img-top" src={obj['image']} />                                      
                                        <div className="card-body">
                                            <h5 className="card-title">{obj['title']}</h5>
                                            <p className="card-text " style={{fontWeight:'500'}}>
                                                {obj['name']}
                                            </p>
                                        </div>
                                        <div className="card-footer background">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="p-styling">Posted</p> 
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="p-styling">{obj['time']}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                            )
                        })}
                    </div>
               )}
               {this.state.auctions.length >  0 && (
                   <div className="row">
                        {this.state.auctions.map((obj,index) => {
                            
                            return(
                                <div key={index} className="col-md-4 m-b-20" onClick={() => this.detail(obj['link'])}>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h3>Foundation</h3> 
                                        </div>
                                        {obj['video'] == 'video' && (
                                            <video className="card-img-top"  src={obj['image_or_video']}  autoPlay playsInline muted/>
                                        )}
                                        {obj['video'] == 'image' && (
                                            <img className="card-img-top" src={obj['image_or_video']} />
                                        )}
                                        {obj['video'] == '' && (
                                            <img className="card-img-top" src={image} />
                                        )}
                                        
                                        <div className="card-body">
                                            <h5 className="card-title">{obj['title']}</h5>
                                            <p className="card-text " style={{fontWeight:'500'}}>
                                                {obj['name']}
                                            </p>
                                        </div>
                                        <div className="card-footer background">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="p-styling">Current Bid</p> 
                                                    <p className="p-styling">{obj['eth']}</p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="p-styling">Ending in</p> 
                                                    <p className="p-styling" id={"countdown " + index}>{obj['remaining_time']}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                            )
                        })}
                    </div>
               )}
               {this.state.auctions_r.length >  0 && (
                   <div className="row">
                        {this.state.auctions_r.map((obj,index) => {
                            
                            return(
                                <div key={index} className="col-md-4 m-b-20" onClick={() => this.detail(obj['link'])}>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h3>Rarible</h3> 
                                        </div>
                                           <img className="card-img-top" src={obj['image_or_video']} />                                      
                                        <div className="card-body">
                                            <h5 className="card-title">{obj['title']}</h5>
                                            <p className="card-text " style={{fontWeight:'500'}}>
                                                {obj['name']}
                                            </p>
                                        </div>
                                        <div className="card-footer background">
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="p-styling">Current Bid</p> 
                                                    <p className="p-styling">{obj['eth']}</p>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="p-styling">Ending in</p> 
                                                    <p className="p-styling" id={"countdown1 " + index}>{obj['remaining_time']}</p>
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>

                            )
                        })}
                    </div>
               )}
               {this.state.auctions_s.length >  0 && (
                   <div className="row">
                        {this.state.auctions_s.map((obj,index) => {
                            
                            return(
                                <div key={index} className="col-md-4 m-b-20" onClick={() => this.detail(obj['link'])}>
                                    
                                    <div className="card">
                                        <div className="card-header text-center">
                                            <h3>Superrare</h3>
                                        </div>
                                        {obj['video'] == 'video' && (
                                            <video className="card-img-top"  src={obj['image_or_video']}  autoPlay playsInline muted/>
                                        )}
                                        {obj['video'] == 'image' && (
                                            <img className="card-img-top" src={obj['image_or_video']} />
                                        )}
                                        {obj['video'] == '' && (
                                            <img className="card-img-top" src={image} />
                                        )}
                                        
                                        <div className="card-body1">
                                            {obj['title'].length > 20 && (
                                                <h5 className="card-title">{obj['title'].substring(0,20) + "..."}</h5>
                                            )}
                                            {obj['title'].length <= 20 && (
                                                <h5 className="card-title">{obj['title']}</h5>
                                            )}
                                            
                                            <p className="card-text ">
                                                {obj['prices'].length == 5 && (
                                                    <span>
                                                        {obj['prices'][2].includes("@") == true && (
                                                            <div className="row">    
                                                                <div className="col-sm-7">
                                                                    <p >{obj['prices'][0]}</p> 
                                                                    <p>{obj['prices'][1]}{obj['prices'][2]}</p>
                                                                </div>
                                                                <div className="col-sm-5">
                                                                    <p >{obj['prices'][3]}</p> 
                                                                    <p>{obj['prices'][4]}</p>
                                                                </div>
                                                            </div>
                                                            
                                                         )}
                                                         {obj['prices'][4].includes("@") == true && (
                                                            <div className="row">    
                                                                <div className="col-sm-5">
                                                                    <p >{obj['prices'][0]}</p> 
                                                                    <p>{obj['prices'][1]}</p>
                                                                </div>
                                                                <div className="col-sm-7">
                                                                    <p >{obj['prices'][2]}</p> 
                                                                    <p>{obj['prices'][3]}{obj['prices'][4]}</p>
                                                                </div>
                                                            </div>
                                                         )}
                                                    </span>
                                                )}
                                                {obj['prices'].length == 4 && (
                                                    <div className="row">    
                                                        <div className="col-sm-6">
                                                            <p >{obj['prices'][0]}</p> 
                                                            <p>{obj['prices'][1]}</p>
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p >{obj['prices'][2]}</p> 
                                                            <p>{obj['prices'][3]}</p>
                                                        </div>
                                                    </div>                                                         
                                                )}
                                                {obj['prices'].length == 3 && (
                                                    <div className="row">    
                                                        <div className="col-sm-12">
                                                            <p >{obj['prices'][0]}</p> 
                                                            <p>{obj['prices'][1]}{obj['prices'][2]}</p>
                                                        </div>
                                                    </div>                                                         
                                                )}
                                                {obj['prices'].length == 2 && (
                                                    <div className="row">    
                                                        <div className="col-sm-6">
                                                            <p >{obj['prices'][0]}</p> 
                                                            <p>{obj['prices'][1]}</p>
                                                        </div>
                                                    </div>                                                         
                                                )}
                                            </p>
                                        </div>
                                        <div className={"card-footer background " + (obj['timer_info'].length != 0 ? 'height-105' : '' )}>
                                            
                                                {obj['timer_info'].length == 0 && (
                                                    <div className="row">
                                                        <div className="col-sm-6">
                                                            <p className="p-styling">{obj['user_info'][0]}</p> 
                                                            {obj['user_info'][1].length > 10 && (
                                                                <p className="p-styling">{obj['user_info'][1].substring(0,10) + "..."}</p>
                                                            )}
                                                            {obj['user_info'][1].length <= 10 && (
                                                                <p className="p-styling">{obj['user_info'][1]}</p>
                                                            )}
                                                            
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <p className="p-styling">{obj['user_info'][2]}</p> 
                                                            {obj['user_info'][3].length > 10 && (
                                                                <p className="p-styling">{obj['user_info'][3].substring(0,10) + "..."}</p>
                                                            )}
                                                            {obj['user_info'][3].length <= 10 && (
                                                                <p className="p-styling">{obj['user_info'][3]}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                                {obj['timer_info'].length != 0 && (
                                                    <div className="row">
                                                        <div className="col-sm-12">
                                                            <p className="p-styling">{obj['timer_info'][0]}</p> 
                                                            <p className="p-styling">{obj['remaining_time']}</p>
                                                        </div>
                                                        {/* <div className="col-sm-3">
                                                            <p className="p-styling font-size-12" style={{marginBottom:'1px'}}>{obj['timer_info'][1]}</p> 
                                                            <p className="p-styling font-size-12">{obj['timer_info'][2]}</p> 
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <p className="p-styling font-size-12" style={{marginBottom:'1px'}}>{obj['timer_info'][3]}</p> 
                                                            <p className="p-styling font-size-12">{obj['timer_info'][4]}</p> 
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <p className="p-styling font-size-12" style={{marginBottom:'1px'}}>{obj['timer_info'][5]}</p> 
                                                            <p className="p-styling font-size-12">{obj['timer_info'][6]}</p>                                                           
                                                        </div>
                                                        <div className="col-sm-3">
                                                            <p className="p-styling font-size-12" style={{marginBottom:'1px'}}>{obj['timer_info'][7]}</p> 
                                                            <p className="p-styling font-size-12">{obj['timer_info'][8]}</p>  
                                                        </div> */}
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                    
                                </div>

                            )
                        })}
                    </div>
               )}
                {/* {(this.state.auctions_s.length == 0 && this.state.auctions.length == 0 && this.state.auctions_r.length == 0) && (
                   
                   <div className="center">
                        <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                        <h4 style={{marginTop:'20px'}}>Fetching Data For Foundation</h4>
                    </div>
               )}

                {(this.state.auctions_r.length == 0 && this.state.auctions_s.length == 0 && this.state.auctions.length > 0) && (
                   
                   <div className="center">
                        <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                        <h4 style={{marginTop:'20px'}}>Fetching Data For Rarible</h4>
                    </div>
               )}  */}
               {(this.state.auctions_s.length == 0 || this.state.auctions_r.length == 0 || this.state.auctions.length == 0) && (
                   
                   <div className="center">
                        <Loader type="Puff" color="#00BFFF" height={100} width={100}/>
                        <h4 style={{marginTop:'20px'}}>Fetching Data</h4>
                    </div>
               )} 
               
               
            </div>
        )
    }
}




export default (Auctions)