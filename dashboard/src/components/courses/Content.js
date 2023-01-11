import React,{useState} from 'react';
import Form from "react-bootstrap/Form";

const Content = () => {
    const inputArr = [];
    const videoArr = [];
    const quizArr = [];
  
    const [arr, setArr] = useState(inputArr);
    const [video, setVideo] = useState(videoArr);
    const [quiz, setQuiz] = useState(videoArr);
  
    const addInput = () => {
      setArr((s) => {
        return [
          ...s,
          {
            type: "text",
            value: "",
            sec: Math.floor(Math.random() * 10),
          },
        ];
      });
    };
    const addVideo = (sec) => {
      setVideo((s) => {
        return [
          ...s,
          {
            type: "text",
            value: "",
            sec: sec,
          },
        ];
      });
    };
    const addQuiz = (sec) => {
      setQuiz((s) => {
        return [
          ...s,
          {
            value: "",
            sec: sec,
          },
        ];
      });
    };
    const handleSecChange = (e) => {
      e.preventDefault();
  
      const index = e.target.id;
      setArr((s) => {
        const newArr = s.slice();
        newArr[index].value = e.target.value;
  
        return newArr;
      });
    };
    const handleVidChange = (e) => {
      e.preventDefault();
  
      const index = e.target.id;
      setVideo((s) => {
        const newArr = s.slice();
        newArr[index].value = e.target.value;
        console.log(newArr);
        return newArr;
      });
    };
    return (
        <>
          <div className="col-12">
              <h3>Content</h3>
              <button type='button' onClick={addInput} className="btn btn-primary">
                New Section
              </button>
              {arr.map((item, i) => {
                return (
                  <div className="col-sm-12 ">
                    <Form.Label htmlFor={i} className="text-dark">
                      Section Name
                    </Form.Label>
                    <input
                      className="form-control text-dark"
                      onChange={handleSecChange}
                      value={item.value}
                      id={i}
                      type={item.type}
                      size="40"
                    />
                    <div
                      class="btn-group"
                      role="group"
                      aria-label="Basic outlined example"
                    >
                      <button
                        type="button"
                        onClick={(e) => addVideo(item.sec)}
                        class="btn btn-outline-primary"
                      >
                        Video
                      </button>
                      <button
                        type="button"
                        onClick={(e) => addQuiz(item.sec)}
                        class="btn btn-outline-primary"
                      >
                        Quizz
                      </button>
                    </div>
                    {video.map((vid, v) => {
                      return item.sec == vid.sec ? (
                        <div className="row course_video_sec">
                          <div className="col-4">
                            <Form.Label htmlFor={v} className="text-dark">
                              Video address {v}
                            </Form.Label>
                            <input
                              className="form-control text-dark"
                              type={vid.type}
                              size="40"
                              id={v}
                            />
                          </div>
                          <div className="col-4">
                            <Form.Label htmlFor={v} className="text-dark">
                              Video Name 
                            </Form.Label>
                            <input
                              className="form-control text-dark"
                              type={vid.type}
                              size="40"
                              id={v}
                            />
                          </div>
                          <div className="col-2">
                            <Form.Label htmlFor={v} className="text-dark">
                              Video time(min)
                            </Form.Label>
                            <input
                              className="form-control text-dark"
                              type="number"
                              size="40"
                              id={v}
                            />
                          </div>
                          <div className="col-2">
                            <Form.Label htmlFor={v} className="text-dark">
                              Video Lock
                            </Form.Label>
                            <Form.Select
                              className="form-control"
                              size="40"
                              id={v}
                            >
                              <option value="1">Lock</option>
                              <option value="2">Open</option>
                            </Form.Select>
                          </div>
                        </div>
                      ) : null;
                    })}
                    {quiz.map((quz, q) => {
                      return item.sec == quz.sec ? (
                        <div className="row course_video_sec">
                          <div className="col-6">
                            <Form.Label htmlFor={q} className="text-dark">
                              Select quiz {q}
                            </Form.Label>
                            <Form.Select
                              className="form-control"
                              type={quz.type}
                              size="40"
                              id={q}
                            > <option value="1">PMP test</option>
                            <option value="2">Nppe</option></Form.Select>
                          </div>
                        </div>
                      ) : null;
                    })}
                  </div>
                );
              })}
            </div>  
        </>
    );
}

export default Content;
