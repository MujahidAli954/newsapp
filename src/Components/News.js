import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'



export class News extends Component {
  static defaultProps = {
    country:"in",
    pages:6,
    category:"sports",
  }

  static propTypes = {
    country:PropTypes.string,
    pages:PropTypes.number,
    category:PropTypes.string,
  }

    constructor(props){
      super(props);
      this.state = {
         articles:[],
         loading:false,
         page:1
      }
      document.title=this.props.category;
    }

    async updateNews (){
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ebb17912541e4cc8a52fe7935e82f99d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let result = await data.json();
      console.log(result);
      this.setState({
        articles:result.articles,
        totalResults:result.totalResults,
        loading:false
      });
    }

    async componentDidMount(){
      this.updateNews();
     
    }
   

    HandlePrevClick = async ()=>{
      console.log("prev");
    this.setState({page:this.state.page +1});
    this.updateNews();
    }
    HandleNextClick = async ()=>{
      this.setState({page:this.state.page+1});
      this.updateNews();
    }

  render() {
    return (
      <div className="container my-3 mb-4">
      <h1 className="text-center">News APP</h1>
     {this.state.loading && <Spinner/>}
        <div className="row">
        {!this.state.loading && this.state.articles.map((element)=>{
          return  <div className="col-lg-4" key={element.url}>
            <Newsitem  title={element.title} description={element.description} imageUrl={element.urlToImage} newsurl={element.url}/> 
          </div>
        })}
        </div>
        <div className="container d-flex justify-content-between">
          <button type="button" disabled={this.state.page<=1} className="btn btn-dark" onClick={this.HandlePrevClick}>&larr;previous</button>
          <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalresult/this.props.pageSize)}className="btn btn-dark" onClick={this.HandleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
 
export default News;
