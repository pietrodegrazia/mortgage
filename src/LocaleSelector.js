import React from 'react';

export default () => {
  return (
    <div className="navbar-locale">
	    <select
	      value={locale}
	      onChange={e => setLocale(e.target.value)}
	      className="locale-select"
	    >
	      <option className="locale-select-option" value="en-US">en-US</option>
	      <option value="pt-BR">pt-BR</option>
	  	</select>
		</div>
	);
};