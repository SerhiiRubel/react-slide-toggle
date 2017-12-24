import React from 'react';
import { SlideToggle } from '../library/ReactSlideToggle';
import eases from 'eases';

//const log = console.log.bind(console);
//log(Object.keys(eases));

const easeNames = Object.keys(eases);

const getRandomEaseName = () => {
  const index = Math.floor(Math.random() * easeNames.length);
  return easeNames[index];
};

class App extends React.Component {
  state = { duration: 400 };

  render() {
    const components = [];
    for (let i = 0; i < 10; i++) {
      components.push(
        <SlideToggle
          key={i}
          duration={this.state.duration}
          ease={getRandomEaseName()}
          toggleState={Math.random() > 0.5 ? 'collapsed' : 'expanded'}
          render={({ onToggle, setCollasibleElement, state }) => (
            <div className="slide-toggle">
              <div className="slide-toggle__header">
                <button className="slide-toggle__button" onClick={onToggle}>
                  toggle
                </button>
              </div>
              <div className="slide-toggle__box" ref={setCollasibleElement}>
                <div className="slide-toggle__box-inner">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </div>
              </div>
              <pre>
                {(() => {
                  return JSON.stringify(state, null, 2);
                })()}
              </pre>
            </div>
          )}
        />
      );
    }

    return (
      <div className="app">
        <button
          className="app__button"
          onClick={() => {
            this.setState({ duration: ~~(Math.random() * 800 + 200) });
          }}
        >
          Randomize
        </button>
        <div className="ease-names">
          <div>Ease names ({easeNames.length}):</div>
          {easeNames.map((name, index) => <span key={index}>{name} </span>)}
        </div>
        {components}
      </div>
    );
  }
}

export default App;