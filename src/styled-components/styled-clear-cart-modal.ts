/**
 * @license
 * Copyright (c) 2021 QBCart Inc. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source repo.
 */

import styled from 'styled-components';

const StyledClearCartModal = styled.div`
  color: black;

  .m-icon-36 {
    font-size: 32px;
    vertical-align: text-top;
  }

  .modal-content {
    border: 2px solid black;
  }

  .modal-header {
    padding: 0.5rem 1rem;
    color: #dc3545;
    background-color: darkslategray;
    border-bottom: 2px solid black;
    border-top-left-radius: 2px !important;
    border-top-right-radius: 2px !important;
  }

  .clear-title {
    font-size: 24px;
    margin-left: 5px;
    color: lightgray;
  }
`;

export default StyledClearCartModal;
