import React, { PropTypes } from 'react';
import { Link } from 'react-router';

/**
 * DocumentListRow
 *
 * @param {Object} props { document, serial }
 * @returns {Object} jsx Object
 */
const DocumentListRow = ({ document, serial }) => {
  const date = new Date(document.updatedAt);
  return (
    <tr>
      <td> {serial} </td>
      <td>
        <Link to={`/documents/view/${document.id}`}>{document.title}</Link>
      </td>
      <td> {document.access} </td>
      <td> {document.type} </td>
      <td> {document.OwnerId} </td>
      <td> {date.toDateString()} </td>
    </tr>
  );
};

DocumentListRow.propTypes = {
  document: PropTypes.object.isRequired,
  serial: PropTypes.number.isRequired,
};

export default DocumentListRow;
