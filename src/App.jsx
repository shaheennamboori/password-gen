import { useCallback, useEffect, useRef, useState } from "react";
function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [pass, setPass] = useState("");

  // ref hook
  const passwordRef = useRef(null);

  const passwordGen = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let numStr = "0123456789";
    let charStr = "!@#$%^&*()";

    if (numAllowed) str += numStr;
    if (charAllowed) str += charStr;

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    let prevPasswordIndex = 0;
    if (numAllowed) {
      prevPasswordIndex = Math.floor(Math.random() * length + 1);
      let numberRandom = numStr.charAt(
        Math.floor(Math.random() * numStr.length + 1)
      );

      pass =
        pass.slice(0, prevPasswordIndex) +
        numberRandom +
        pass.slice(prevPasswordIndex + 1, length);
    }

    if (charAllowed) {
      let passwordIndex = 0;
      passwordIndex = Math.floor(Math.random() * length + 1);
      do {
        passwordIndex = Math.floor(Math.random() * length + 1);
      } while (prevPasswordIndex == passwordIndex);

      let characterRandom = numStr.charAt(
        Math.floor(Math.random() * charStr.length + 1)
      );

      pass =
        pass.slice(0, passwordIndex) +
        characterRandom +
        pass.slice(passwordIndex + 1, length);
    }

    setPass(pass);
  }, [length, numAllowed, charAllowed, setPass]);

  const copyTo = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(pass);
  }, [pass]);

  useEffect(() => {
    passwordGen();
  }, [length, numAllowed, charAllowed, passwordGen]);

  return (
    <>
      <div className="h-lvh flex items-center">
        <div className="flex flex-col justify-between w-full max-w-md mx-auto shadow-md rounded-lg px-4 pb-10 pt-3 my-8 text-orange-500 bg-gray-700">
          <h1 className="text-white text-center mb-3 mt-1">
            Password Generator
          </h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input
              type="text"
              value={pass}
              className="outline-none w-full py-1 px-3"
              placeholder="password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
              onClick={copyTo}
            >
              Copy
            </button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className="flex items-center gap-x-1">
              <input
                type="range"
                min={6}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label> Length: {length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={numAllowed}
                id="numberInput"
                onChange={() => {
                  setNumAllowed(!numAllowed);
                }}
              />
              <label>Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                defaultChecked={charAllowed}
                id="charInput"
                onChange={() => {
                  setCharAllowed(!charAllowed);
                }}
              />
              <label>Special Char</label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
