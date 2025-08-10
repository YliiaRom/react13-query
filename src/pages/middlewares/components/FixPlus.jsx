function FixPlus() {
  return (
    <div className="sectionWrap">
      <h2>
        Задача 1: Напишіть middleware, який фіксує всі дії додавання і зберігати
        історію змін в localStorage
      </h2>
      <div className="blackBox">
        <h3>📂utils &gt; 📂lsOperations.js &gt; 📄</h3>
        <p>
          function <span className="accent">readColl(keyLS)</span> &#123;
          <br />
          return JSON.parse(localStorage
          <br />
          .getItem(keyLS)) || []; &#125;
        </p>
        <p>
          function <span className="accent">writeColl(keyLS, list)</span> &#123;
          <br />
          localStorage.setItem(keyLS, JSON.stringify(list)); &#125;
        </p>
        <p>
          export const <span className="accent">addItemActionToLS</span> =
          <span className="accent">(itemObj, keyLS)</span> =&gt; &#123;
          <br />
          const list = readColl(keyLS);
          <br />
          list.push(itemObj);
          <br />
          writeColl(keyLS, list); &#125;;
        </p>
        <h3>
          📂middlewares &gt; <br />
          📂addHistoryMDL.js{" "}
        </h3>
        <p>
          export const <span className="accent">addHistoryMDL</span> = () =&gt;
          (next) =&gt; (action) =&gt; &#123;
          <br />
          if (action.type === "payments/addPayment") &#123;
          <br />
          console.log(`---action`, action);
          <br />
          next(action);
          <br />
          <span className="accent">addItemActionToLS </span>(action,
          "history-money") ;
          <br />
          &#125;
          <br />
          &#125;;
          <br />
        </p>
        <h3>📂store &gt; 📄index.js</h3>
        <p>
          const store = configureStore(&#123;
          <br />
          reducer: &#123;
          <br />
          payments: paymentReducer,
          <br />
          posts: postsSliceReducer,
          <br />
          &#125;,;
          <br />
          <span className="accent"> middleware:</span> (getDefaultMiddleware)
          =&gt;
          <br />
          getDefaultMiddleware() <br />
          .concat(
          <span className="accent">addHistoryMDL</span>),
          <br />
          &#125;); <br /> export default store;
          <br />
        </p>
      </div>
    </div>
  );
}

export default FixPlus;
