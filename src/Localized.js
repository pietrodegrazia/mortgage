import {
  useQuery,
  gql
} from "@apollo/client";

const Localized = ({ id, locale }) => {
  const getTranslationQuery = gql`
    query($key: String!, $locale: String!) {
      translation(key: $key, locale: $locale) {
        text
      }
    }
  `
  const variables = {
    key: id,
    locale: locale
  };
  const { loading, error, data } = useQuery(getTranslationQuery, { variables });

  if (loading) return <p></p>;
  if (error) return <p>#{id}</p>;

  return (
    <span>
      { data.translation.text } 
    </span>
  );
};

export default Localized;