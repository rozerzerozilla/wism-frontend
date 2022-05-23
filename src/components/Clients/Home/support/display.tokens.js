const DisplayTokens = ({
  tokens,
  noShow,
  completed,
  isLoading,
  errors,
  success,
  tokenChange,
  disableSelect,
  setDisableSelect,
}) => {
  const timeStamp = new Date().getTime();
  return (
    <>
      <div className="col-12">
        <div className="mb-4">
          <div className="card-body px-0 pt-0 pb-2">
            <div className="table-responsive p-0 mx-1">
              <table className="table align-items-center mb-0 ">
                <thead>
                  <tr>
                    <th className="text-xxs font-weight-bolder">Client</th>
                    <th className="text-xxs font-weight-bolder">Phone</th>
                    <th className="text-xxs font-weight-bolder">Service</th>
                    <th className="text-xxs font-weight-bolder">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {tokens &&
                    tokens.map((token) => (
                      <>
                        <tr key={token.id}>
                          <td>{token.name}</td>
                          <td>{token.phone}</td>
                          <td>{token.service}</td>
                          <td>
                            <select
                              className="form-control"
                              onChange={(e) =>
                                tokenChange(token.id, e.target.value)
                              }
                              disabled={
                                disableSelect && token.progress !== "SERVING"
                                  ? true
                                  : false
                              }
                            >
                              <option
                                value="OPEN"
                                selected={
                                  token.progress === "OPEN" ? true : false
                                }
                              >
                                OPEN
                              </option>
                              <option
                                value="SERVING"
                                selected={
                                  token.progress === "SERVING" ? true : false
                                }
                              >
                                SERVING
                              </option>
                              <option
                                value="SERVED"
                                selected={
                                  token.progress === "SERVED" ? true : false
                                }
                              >
                                SERVED
                              </option>
                              <option
                                value="NO SHOW"
                                selected={
                                  token.progress === "NO SHOW" ? true : false
                                }
                              >
                                NO SHOW
                              </option>
                            </select>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DisplayTokens;
