import React from 'react';

export default (props) => {
  return (
    <div className="navbar-locale">
	    <select
	      value={props.value}
	      onChange={props.onChange}
	      className="locale-select"
	    >
	    	{props.options.map(function(option, index){
         return (<option key={index} value={option}>{option}</option>)
       	})}
	  	</select>
		</div>
	);
};