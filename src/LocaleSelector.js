import {
  useQuery,
  gql
} from "@apollo/client";

const LocaleSelector = (props) => {
	const getLocalesQuery = gql`
    query {
      locales {
        key
      }
    }
  `
  const { loading, error, data } = useQuery(getLocalesQuery);

  if (loading) return <span>...</span>;
  if (error) return <span>{error}</span>;

  return (
    <div className="navbar-locale">
	    <select
	      value={props.value}
	      onChange={props.onChange}
	      className="locale-select"
	    >
	    	{data.locales.map(function(locale, index){
         return (<option key={index} value={locale.key}>{locale.key}</option>)
       	})}
	  	</select>
		</div>
	);
};

export default LocaleSelector;