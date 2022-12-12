import React, { useState } from "react";

import { useEffect } from "react";
import { getCandidate, getSectors, update } from "../../api/apiCalls";
import "../signup/signup.css";
export default function Signup() {
  const [sectors, setSectors] = useState([]);
  const [sectors1, setSectors1] = useState([]);
  const [candidate, setCandidate] = useState([]);

  const handleChnage = (e) => {
    const { value } = e.target;

    if (candidate?.sectors?.includes(value)) {
      const temp1 = candidate?.sectors?.filter((val) => val !== value);
      console.log(temp1);
      setCandidate({ ...candidate, sectors: temp1 });
    } else {
      const temp1 = [...candidate?.sectors];
      temp1?.push(value);
      console.log(temp1);

      setCandidate({ ...candidate, sectors: temp1 });
    }
  };
  useEffect(() => {
    getSectors(setSectors);
    getCandidate(setCandidate);
  }, []);

  useEffect(() => {
    const temp = sectors?.map((val) => {
      return {
        ...val,
        isChecked: candidate?.sectors?.includes(val.val),
        subsectors: val?.subsectors?.map((vall) => {
          return {
            ...vall,
            isChecked: candidate?.sectors?.includes(vall.val),
            subsubsectors: vall?.subsubsectors?.map((valll) => {
              return {
                ...valll,
                isChecked: candidate?.sectors?.includes(valll.val),
                subsubsubsectors: valll?.subsubsubsectors?.map((vallll) => {
                  return {
                    ...vallll,
                    isChecked: candidate?.sectors?.includes(vallll.val),
                  };
                }),
              };
            }),
          };
        }),
      };
    });

    setSectors1(temp);
  }, [sectors, candidate]);

  const updateCandidate = () => {
    update(candidate, setCandidate);
  };
  return (
    <div className="main">
      <div className="container">
        <h1>
          Please enter your name and pick the Sectors you are currently involved
          in.
        </h1>
        <div>
          <div className="name">
            <label htmlFor="name">Insert Name:</label>
            <input
              value={candidate?.name || ""}
              onChange={(e) =>
                setCandidate({ ...candidate, name: e.target.value })
              }
              type="text"
              id="name"
            />
          </div>
          <h3>Sectors</h3>
          {sectors1?.map((value) => {
            return (
              <div key={value.val} className="form-check">
                <input
                  type="checkbox"
                  className={
                    value?.subsectors?.length === 0
                      ? "form-check-input"
                      : "nocheckbox"
                  }
                  name={value.name}
                  value={value.val || ""}
                  onChange={handleChnage}
                  checked={value?.isChecked || false}
                />

                <label className={"nocheckboxlabel1"}>{value.name}</label>
                {value?.subsectors?.map((val) => {
                  return (
                    <div key={val.val} className="form-check">
                      <input
                        type="checkbox"
                        // className="form-check-input"
                        className={
                          val?.subsubsectors?.length === 0
                            ? "form-check-input"
                            : "nocheckbox"
                        }
                        name={val.name}
                        value={val.val || ""}
                        onChange={handleChnage}
                        checked={val?.isChecked || false}
                      />
                      <label className={"nocheckboxlabel2"}>{val.name}</label>

                      {val?.subsubsectors?.map((vall) => {
                        return (
                          <div key={vall.val} className="form-check">
                            <input
                              type="checkbox"
                              className={
                                vall?.subsubsubsectors?.length === 0
                                  ? "form-check-input"
                                  : "nocheckbox"
                              }
                              name={vall.name}
                              value={vall.val || ""}
                              onChange={handleChnage}
                              checked={vall?.isChecked || false}
                            />
                            <label className={"nocheckboxlabel3"}>
                              {vall.name}
                            </label>
                            {vall?.subsubsubsectors?.map((valll) => {
                              return (
                                <div key={valll.val} className="form-check">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    name={valll.name}
                                    value={valll.val || ""}
                                    onChange={handleChnage}
                                    checked={valll?.isChecked || false}
                                  />
                                  <label className="nocheckboxlabel4">
                                    {valll.name}
                                  </label>
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
        <div>
          <input
            onChange={() =>
              setCandidate({ ...candidate, isAgree: !candidate.isAgree })
            }
            checked={candidate.isAgree || ""}
            type="checkbox"
            name="terms"
            id="terms"
          />
          <label htmlFor="terms">Agree to terms</label>
        </div>
        <div>
          <button onClick={updateCandidate}>Save</button>
        </div>
      </div>
    </div>
  );
}
