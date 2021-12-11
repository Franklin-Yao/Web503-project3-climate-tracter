import React from "react";
import Lists from "./Lists";
import CreatList from "./CreatList";

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: false,
        alldata: [],
        singledata: {
          title: "",
          author: ""
        }
      };
    }

    getLists = ()=>{
      fetch("/api/books").then(res=>res.json())
      .then(
        result=>this.setState({
        loading: false,
        alldata: result
      }
      ))
      .catch(console.log);
    }

    getList = (e, id)=>{
      this.setState(
        {
          singledata:{
            title: "Loading...",
            author: "Loading..."
          }
        },
        ()=>{
          fetch("/api/book/"+id)
            .then(res=>res.json())
            .then(
              result=>this.setState({
              singledata:{
                title: result.title,
                author: result.author?result.author:""
              }
            }
            ))
        }
      )
    }

    updateList = (event, id)=>{
      fetch(`/api/book/${id}`, {
        method: "PUT",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.singledata)
      }).then(res=>res.json())
      .then(result=>{
        this.setState({
        singledata:{
          title: "",
          author: ""
        }
      });
      this.getLists();
    });
    }

    deleteList = (event, id)=>{
      fetch("/api/book/"+id, {
        method: "DELETE"
      }).then(res=>res.json())
      .then(result=>{
        this.setState({
        singledata:{
          title: "",
          author: ""
        }
      });
      this.getLists();
    });
    }

    createList = ()=>{
      fetch("/api/book/", {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state.singledata)
      }).then( ()=>{
        this.setState({
          singledata:{
            title: "",
            author: ""
          }
        });
      this.getLists();
      });
    }

    handleChange=(e)=>{
      let title = this.state.singledata.title;
      let author = this.state.singledata.author;
      if (e.target.name==="title") title = e.target.value;
      else author = e.target.value;

      this.setState({
        singledata:{
          title:title,
          author: author
        }
      })
    }

    render(){
      const listTable = this.state.loading?(<span>Loading Data..... Please be patience</span>):
      (<Lists 
        alldata={this.state.alldata}
        singledata={this.state.singledata}
        getList={this.getList}
        updateList = {this.updateList}
        deleteList = {this.deleteList}
        handleChange = {this.handleChange}
      />);
      return(
        <div className="container">
          <span className="title-bar">
            {/* <button type="button" className="btn btn-primary" onClick={this.getLists}>
              Get Lists
            </button> */}
            {this.getLists()}

            <CreatList singledata={this.state.singledata} 
              handleChange={this.handleChange}
              createList = {this.createList}
            />
          </span>
          {listTable}
        </div>
      )
    }
  }

export default App;