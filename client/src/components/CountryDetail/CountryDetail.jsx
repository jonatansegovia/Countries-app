import React from 'react';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getCountryByParams } from '../../actions';
import Card from '../Card/Card';

function CountryDetail({ country, getCountryByParams }) {
  const { idPais } = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCountryByParams(idPais);
    setLoading(false);
  }, [setLoading]);

  return (
    <div>
      <Card countries={[country]} loading={loading} byParams={idPais} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return { country: state.country };
};

export default connect(mapStateToProps, { getCountryByParams })(CountryDetail);
