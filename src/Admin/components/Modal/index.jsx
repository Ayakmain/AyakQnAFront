import React from 'react';
import { withRouter } from 'react-router-dom';
import { Calendar } from '..';
import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';

const Modal = ({ date, closeFunc, selectDate, openFunc, type }) => (
  <Dialog open={openFunc} onClose={closeFunc} fullWidth={true}>
    <Calendar
      selectDate={e => selectDate(e, type)}
      date={date ?? moment().format('YYYY-MM-DD')}
    />
  </Dialog>
);

export default withRouter(Modal);
