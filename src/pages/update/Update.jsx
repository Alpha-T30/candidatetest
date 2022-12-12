import React, { useState } from "react";

import { useEffect } from "react";
import { getCandidate, getSectors, update } from "../../api/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./update.css";

export default function Update() {
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
    if (candidate.sectors.length === 0) {
      toast.warn("Please select at least one sector", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (candidate.isAgree === false) {
      toast.warn("You must agree to the trems", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (candidate?.name === "" || candidate.name?.length < 3) {
      toast.warn("Please Insert A Name (at least 3 letter)", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else {
      update(candidate, setCandidate, toast);
    }
  };
  return (
    <div className="main">
      <ToastContainer></ToastContainer>
      <div className="container">
        <div className="heading">
          <span>
            Please enter your name and pick the Sectors you are currently
            involved in.
          </span>
        </div>
        <div>
          <div className="name">
            <label className="namelabel" htmlFor="name">
              Name:
            </label>
            <input
              className="form-control"
              type="text"
              placeholder="Default input"
              value={candidate?.name || ""}
              onChange={(e) =>
                setCandidate({ ...candidate, name: e.target.value })
              }
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
        <div style={{ margin: "10px" }}>
          <input
            className="form-check-input"
            onChange={() =>
              setCandidate({ ...candidate, isAgree: !candidate.isAgree })
            }
            checked={candidate.isAgree || ""}
            type="checkbox"
            name="terms"
            id="terms"
          />
          <label
            style={{
              marginLeft: "7px",
              color: "blue",
              fontWeight: "bold",
              textDecoration: "underline",
              cursor: "pointer",
            }}
          >
            Agree to terms
          </label>
        </div>
        <div className="btndiv">
          <button className="custombtn" onClick={updateCandidate}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
