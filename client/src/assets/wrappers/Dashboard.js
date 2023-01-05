import styled from "styled-components";

const Wrapper = styled.main`
  width: var(--fluid-width);
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .tasks-container {
    margin-bottom: 3rem;
    width: var(--fluid-width);
    max-width: var(--max-width);
  }
  .form-row {
    width: none;
    margin-bottom: 0;
  }
  .form-row {
    input:focus {
      outline: none;
      border: 1px solid var(--primary);
    }
  }
  .form {
    display: grid;
    width: var(--fluid-width);
    max-width: var(--max-width);
    padding: 1.5rem;
    gap: 1rem;
    box-shadow: none;
    margin: 3rem auto;
  }
  .btn {
    text-align: center;
    box-shadow: none;
  }
  .tasks {
    display: none;
    padding: 1rem;
    align-items: center;
    justify-content: center;
    width: var(--fluid-width);
    max-width: var(--max-width);
    background-color: var(--grey-100);
    grid-template-columns: 1fr 1fr 150px 100px 100px;
    column-gap: 1rem;
    border-radius: 0.25rem 0.25rem 0 0;
    margin-top: 3rem;
  }
  .tasks p {
    color: var(--grey-500);
    margin: 0;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .tasks p:nth-child(2),
  p:nth-child(3),
  p:nth-child(4) {
    text-align: center;
  }
  .single-job {
    background-color: white;
    border-radius: var(--borderRadius);
    margin-bottom: 2rem;
    display: grid;
    padding: 2rem;
    justify-content: center;
    text-align: center;
  }
  .single-job p:first-child {
    font-weight: bold;
  }
  .single-job p {
    color: var(--grey-500);
    margin: 0;
    letter-spacing: 1px;
    font-weight: 500;
    margin: 0.25rem 0;
  }
  .icon-delete {
    color: var(--red-dark);
    font-size: 1.5rem;
  }
  .icon-add {
    color: var(--green-dark);
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
  .icon-delete,
  .icon-add:hover {
    cursor: pointer;
  }
  .btn-add {
    font-size: 1rem;
    height: 35px;
  }
  .icon {
    background: var(--primary);
    border-radius: var(--borderRadius);
    color: white;
    font-size: 2rem;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto 0.75rem auto;
  }
  .action-div {
    display: inline-block;
    align-items: center;
    justify-content: center;
    gap: 0px 0.5rem;
    height: 25px;
    margin-top: 0.25rem;
    text-align: center;
  }
  @media (min-width: 768px) {
    .form {
      margin-bottom: 3rem;
    }
    .tasks-container {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
    }
    .single-job p {
      color: var(--grey-500);
      margin: 0;
      letter-spacing: 1px;
      font-weight: 500;
      font-size: 0.8em;
    }
  }
  @media (min-width: 992px) {
    .tasks {
      display: grid;
      margin-top: 0;
      grid-template-columns: 1fr 150px 100px 100px;
    }
    .form {
      column-gap: 1rem;
      grid-template-columns: 3fr auto auto;
    }
    .tasks-container {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 0;
    }
    .single-job {
      display: grid;
      padding: 1rem;
      align-items: center;
      justify-content: center;
      background-color: white;
      grid-template-columns: 1fr 150px 100px 100px;
      column-gap: 1rem;
      border-top: 1px solid var(--grey-200);
      margin-bottom: 0;
      text-align: left;
    }
    .single-job p:first-child {
      font-weight: 400;
    }
    .single-job:first-child {
      border-top: none;
    }
    .single-job:last-child {
      border-radius: 0 0 0.25rem 0.25rem;
    }
    .icon {
      display: none;
    }
    .btn-add {
      padding: 0 2rem;
    }
  }
`;

export default Wrapper;
