function Tasks() {
  return (
    <div className="tasksBox">
      <h2>
        {" "}
        Tasks + RTK Query()
        <br />
        Перегорни картку, зрівняй відповідь
      </h2>

      <div className="questionsCard">
        <div className="questFront">
          <p> createApi():</p>

          <p>export const api = createApi(&#123;</p>
        </div>
        <div className="questBack">
          <p>
            Ядро функціональності, що дозволяє{" "}
            <span className="accent">визначити набір "ендпоінтів"</span> для
            <span className="accent"> отримання</span> та{" "}
            <span className="accent">трансформації даних</span>.
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          <p>fetchBaseQuery():</p>
          <p>baseQuery: fetchBaseQuery(&#123; baseUrl: '/api'&#125;),</p>
        </div>
        <div className="questBack">
          <p>
            обгортка навколо fetch, для спрощення запитів <br />(
            <span className="accent">baseUrl</span> (базова адреса API),
            <br />
            <span className="accent"> prepareHeaders</span> (додавання/зміна
            заголовків перед запитом),
            <br />
            <span className="accent"> credentials </span>(керування куками),{" "}
            <br />
            <span className="accent"> fetchFn </span>(власна реалізація fetch),
            <span className="accent"> paramsSerializer</span> (кастомна обробка
            query- параметрів),
            <br />
            <span className="accent"> headers</span> (глобальні заголовки для
            всіх запитів)).
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">reducerPath: 'api' ?</div>
        <div className="questBack">Унікальне ім`я для інтеграції в store</div>
      </div>

      <div className="questionsCard">
        <div className="questFront">Додавання до store</div>
        <div className="questBack">
          <p>
            export const store = <span className="accent">configureStore</span>
            (&#123;
            <br />
            reducer: &#123; // Додаємо згенерований редуктор
            <br />
            <span className="accent">[api.reducerPath]: api.reducer,</span>{" "}
            &#125;,
            <br />
            middleware: (getDefaultMiddleware) =&gt;
            <br />
            getDefaultMiddleware().concat(
            <span className="accent">api.middleware</span>)
            <br />
            &#125;)
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Що робить unwrap() ?
          <br /> await addPost(&#123;
          <br />
          id: new Date().getTime(),
          <br />
          title: e.target.elements.title.value,
          <br />
          body: e.target.elements.body.value,
          <br />
          &#125;).unwrap();
        </div>
        <div className="questBack">
          .unwrap() у RTK Query (Redux Toolkit Query) використовується для того,
          щоб «розпакувати» результат мутації або запиту і: ✅ отримати data
          напряму, якщо запит пройшов успішно;
          <br />❌ викинути помилку (throw), якщо запит завершився з помилкою —
          щоб її можна було обробити в try...catch.
          <br />
          🔁 Без .unwrap() довелось би перевіряти isSuccess / isError вручну.
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          {" "}
          Що робить
          <br />
          tagTypes: ["Posts"]
          <br /> ?
        </div>
        <div className="questBack">
          Вказує типи тегів, які будуть використовуватися для кешування та
          інвалідації <br />
          <span className="accent"> tagTypes: [</span>'Post'],
          <br /> endpoints: (build) =&gt; (&#123;
          <br />
          // 1. Приклад запиту (Query): Отримання одного поста за ID
          <br />
          getPost:<span className="accent"> build.query(&#123;</span>
          <br />
          query: (id) =&gt; `posts/$&#123;id&#125;`,
          <br />
          // Надає тег 'Post' з конкретним ID для кешованих даних.
          <br />
          <span className="accent">providesTags: (result, error, id)</span>
          =&gt; [&#123; type: 'Post', id &#125;],
          <br />
          &#125;)
          <br />
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          transformResponse: (response, meta, arg) ?
        </div>
        <div className="questBack">Обробка відповіді перед кешуванням</div>
      </div>
      <div className="questionsCard">
        <div className="questFront">keepUnusedDataFor: 60</div>
        <div className="questBack">
          <span className="accent">keepUnusedDataFor: 60</span>
          Час
          <span className="accent">життя кешу</span> після останноього
          використання (60 - секунди).
          <br /> [Зробили запит --&gt; через 60sec данні видаляться = не
          беруться з кеша, завантажуються заново]
        </div>
      </div>

      <div>
        <h2>pagination</h2>
      </div>
      <div>
        {" "}
        <button
          className="pgMainBtn"
          style={{
            boxShadow: "0px 5px 13px #555",
          }}
        >
          <a
            href="https://redux-toolkit.js.org/rtk-query/usage/infinite-queries"
            target="_blank"
          >
            Doc infinity pagination
          </a>
        </button>{" "}
      </div>

      <div className="questionsCard">
        <div className="questFront">
          <div>
            <button
              className="pgMainBtn"
              style={{
                boxShadow: "0px 5px 13px #555",
              }}
            >
              <a
                href="https://redux-toolkit.js.org/rtk-query/usage/infinite-queries"
                target="_blank"
              >
                Doc infinity pagination
              </a>
            </button>{" "}
            <br />
            <br />
            build.infiniteQuery(&#123; ?
          </div>
        </div>
        <div className="questBack" style={{ fontSize: "14px" }}>
          <span>
            getPosts: build.<span className="accent">infiniteQuery</span>(&#123;
          </span>
          <br />
          <span>
            <span className="accent">query: (&#123; pageParam = 1 &#125;)</span>{" "}
            =&gt;
            <br /> 'posts?_page=$&#123;pageParam &#125;&_limit=10',
          </span>
          <br />
          <span className="accent">infiniteQueryOptions: &#123;</span>
          <br />
          <span>
            <span className="accent">initialPageParam: 1, </span>// Початкове
            значення параметра сторінки.
          </span>
          <br />
          <span className="accent">
            getNextPageParam: (lastPage, allPages, lastPageParam) =&gt; &#123;
          </span>
          <br />
          // Функція для обчислення наступного параметра сторінки. //
          Припускаємо, що API повертає щось, що дозволяє визначити наступну
          <br />
          сторінку.{" "}
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          <p style={{ color: "#000000" }}>build.infiniteQuery(&#123;</p>
          <p style={{ color: "#000000" }}>
            query: (&#123;pageParam = 1&#125;) =&gt;'...'
          </p>{" "}
          <br />
          infiniteQueryOptions: &#123;
          <br />
          <br />
          initialPageParam: x,
          <br /> maxPages: 3,
          <br /> getNextPageParam:(a, b, c,...) =&gt;
        </div>
        <div className="questBack">
          <h3>DOC</h3>
          <p>
            <span className="accent">initialPageParam</span>: 1, // Початкове
            значення параметра сторінки.
          </p>
          <p>
            <span className="accent">maxPages: 3</span> //За бажанням обмежте
            кількість кешованих сторінок
          </p>
          <span className="accent">getNextPageParam</span>: (lastPage, allPages,
          lastPageParam) =&gt; &#123;-обчіслення для наступн стор
          <br />
          <p>
            {/* // Припускаємо, що API повертає щось, що дозволяє визначити наступну
            сторінку.
            <br />
            // Тут просто збільшуємо номер сторінки. */}
            // Немає більше даних
            <br /> if (lastPage && lastPage.length === 0) &#123;
            <br />
            return undefined&#125; <br /> return{" "}
            <span className="accent">lastPageParam + 1&#125;</span>,
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Ф-ція для Кнопки (Component)
          <br />
          <button style={{ boxShadow: "0px 5px 20px #000" }}>
            {" "}
            → наступна Сторінка
          </button>
          const &#123;data, fetchNextPage, hasNextPage, isFetching, isLoading,
          isError&#125; = useGetPostsInfiniteQuery()
        </div>
        <div className="questBack">
          {" "}
          const handlerNextPage = async () =&gt; &#123;
          <br />
          <span>
            if (currentPageIndex + 1 === totalPages &&
            <span className="accent">hasNextPage</span>) &#123;
          </span>
          <br />
          <span className="accent">await fetchNextPage()</span>
          <br />
          <span className="accent">setCurrentPageIndex</span>((prev) =&gt; prev
          + 1);
          <br />
          &#125;;
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          {" "}
          Ф-ція для Кнопки (RTK Query)
          <br />
          <button style={{ boxShadow: "0px 5px 20px #000" }}>
            {" "}
            → наступна Сторінка
          </button>
        </div>
        <div className="questBack" style={{ fontSize: "14px" }}>
          getNextPageParam: (lastPage, allPages, lastPageParam) =&gt; &#123;
          <br />
          if (lastPage && lastPage.length === 0) &#123;
          <br />
          return undefined; // больше страниц нет
          <br />
          &#125;
          <br /> return lastPageParam + 1; // следующая страница &#125;{" "}
          <span>
            &#125; Эта функция получает данные
            <span className="accent"> последней загруженной страницы </span>
            (lastPage) <br />и
            <span className="accent"> текущий параметр страницы </span>
            (lastPageParam).
            <br />
            Если данных нет — возвращает undefined, значит страниц больше нет.
            <br />
            Иначе<span className="accent"> возвращает следующий параметр</span>
            (например, lastPageParam + 1). &#125;{" "}
          </span>
        </div>
        <br />
      </div>
      <div className="questionsCard">
        <div className="questFront">
          fetchNextPage() ?<br />
          <br />
          const handlerNextPage = async () =&gt; &#123;
          <span>
            if (currentPageIndex + 1 === totalPages &&
            <span>hasNextPage</span>) &#123;
          </span>
          <span style={{ color: "#000" }}>await fetchNextPage()</span>
          <span>setCurrentPageIndex</span>((prev) =&gt; prev + 1);
          <br />
          &#125;;
        </div>
        <div className="questBack">
          await <span className="accent">fetchNextPage()</span>; <br />
          // вызвали запрос //
          <br />
          <span className="accent">RTK Query вызывает getNextPageParam,</span>
          получает nextPageParam = 2 <br />
          // делает запрос с pageParam=2 /<br />
          // получает данные и добавляет их в data.pages <br />
          getNextPageParam — логика вычисления, какую страницу загружать
          следующей.
          <br /> fetchNextPage() — <span className="accent">триггер,</span>{" "}
          который запускает запрос следующей страницы.
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Ключиві моменти при пагінаціі і відображення з кешу
        </div>
        <div className="questBack">
          <span>
            Нові дані запитуються тільки тоді, коли ти
            <span className="accent"> на останній завантаженій сторінці</span>
          </span>
          .
          <br />{" "}
          <span>
            <br /> Перемикання між уже завантаженими сторінками — це просто{" "}
            <span className="accent">зміна індексу.</span>
            <br />{" "}
          </span>
          <br />{" "}
          <span>
            <span className="accent">data.pages — це «історія» </span>всіх
            сторінок, які вже завантажили.
          </span>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">зміщення (offset)</div>
        <div className="questBack">
          на основі поточної сторінки та кількості елементів на сторінці <br />{" "}
          const offset = currentPage * xxxPerPage;
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">select()</div>
        <div className="questBack">
          <p>Повертає данні з кеша</p>
          <p>
            <span>
              {" "}
              const x =<span className="accent"> useSelector</span>((state)
              =&gt;
            </span>
            <br />
            <span>
              myApi.edpoint.nameFunction<span className="accent">.select</span>
              (&#123;limit: a, offset:b&#125;)(state)
              <span className="accent">?.date</span>) )
            </span>
            <br />
            тут data = данні що закешованні на сторінці с параметрами limit: a,
            offset:b
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          теги для кешування (створення, підлючення до них, оновлення
          інформації)
        </div>
        <div className="questBack">
          <p>
            <span className="accent">tagTypes:</span> ["Xxx"] = створення тега
            для кеша
          </p>
          <br />
          <p>
            <span className="accent">providesTags:</span> ["Xxx"] = підключення
            до кеша під назвою
          </p>
          <br />
          <p>
            <span className="accent">invalidateTags: </span>["Xxxx"] - оновлення
            після мутацій
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Detail.jsx <br />
          Якщо завантаженно декілька постів
          <br /> <br />
          getPostById: build.query: (&#123; <br />
          query: (id) =&gt; 'post/$&#123;id&#125;',
          <br />
          providesTags: ....Як зберігати в кеш?
        </div>
        <div className="questBack">
          <span>
            Описати функцію яка використовує id, щоб кожен завантаж item
            <span className="accent"> зберігався в окремому блоці</span>
          </span>{" "}
          <br />
          <span>
            <span className="accent"> providesTags</span>: (result, error,{" "}
            <span className="accent">id</span>) =&gt; [
            <span className="accent">
              &#123;
              <br />
              type: "Tags", id&#125;
            </span>
            ]
          </span>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">Зміна лайків ? </div>
        <div className="questBack">
          <span>
            <span className="accent"> build.mutation</span>(&#123;
          </span>
          <br />
          query:(id) =&gt; (&#123; <br />
          <span>
            url: 'post/$<span className="accent">&#123;id&#125;</span>;/likes'
          </span>
          <span>
            method: <span className="accent">"POST"</span>
          </span>
          &#125;), <br />{" "}
          <span>
            <span className="accent">invalidateTags: </span>(result, error, id)
            =&gt;
          </span>
          [&#123;type: "Post", id &#125;] <br />
          <br />
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">Оновити список після DELETE</div>
        <div className="questBack">
          <span>
            {" "}
            <span className="accent">tagTypes:</span> ['Post', 'Posts'],
          </span>
          <br />
          <p> ...</p>
          <p>
            deletePost: build.mutation(&#123;
            <br />
            <span className="accent"> query: </span>(id) =&gt; (&#123;
            <br />
            <span>
              {" "}
              url: `/posts/$&#123;<span className="accent">id</span>&#125;`,
            </span>
            <br />
            <span>
              method: <span className="accent">'DELETE'</span>
            </span>
            , <br />
            &#125;),
            <br />
            <span>
              <span className="accent">invalidatesTags: </span>(result, error,
              id) =&gt;
            </span>{" "}
            [<br />
            <span>
              {" "}
              &#123; type:{" "}
              <span className="accent">'Posts', id: 'LIST' &#125;</span>,
            </span>
            <br />
            <span>
              {" "}
              &#123; type: <span className="accent">'Post', id &#125;</span>,
            </span>
            <br />
            ],
            <br />
            &#125;),
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Список постів з пагінацією (build.query) <br />
          додавання інформації в кеш про кожен пост
        </div>
        <div className="questBack">
          <p style={{ color: "green" }}> tagTypes: ['Post', 'Posts'],</p>
          Список постів з пагінацією (build.query)
          <p>
            getPostsP: build.query(&#123;
            <br />
            <span>
              <span className="accent"> query:</span> (&#123; page = 1, limit =
              10 &#125;) =&gt;
            </span>
            <br />
            `/posts?_page=$&#123;page&#125;&_limit=$&#123;limit&#125;`,
            <br />
            <span>
              {" "}
              <span className="accent">
                providesTags: (<span style={{ color: "green" }}>result</span>)
              </span>{" "}
              =&gt;
            </span>
            <br />
            result
            <br />
            <span>
              ? [ <span className="accent">...result</span>.items.
              <span className="accent">map</span>((
              <span className="accent">&#123; id &#125;</span>) =&gt; <br />(
              <span className="accent">&#123; type: 'Post', id &#125;</span>)),
            </span>
            <br />
            <span style={{ color: "green" }}>
              {" "}
              &#123; type: 'Posts', id: 'LIST' &#125; ]
            </span>
            ,
            <br />
            <br />
            : [&#123; type: 'Posts', id: 'LIST' &#125;],
            <br />
            &#125;),
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Хук находження скрола в кінці <br />
          const isBottom = useScrollToBottom() <br />
          (const isBottom = true/false)
        </div>
        <div className="questBack">
          <p style={{ fontSize: "10px" }}>
            export function useScrollToBottom(offset = 100) &#123;
            <br />
            const [isBottom, setIsBottom] = useState(false)
            <br />
            useEffect(() =&gt; &#123;
            <br />
            <span className="accent"> let ticking = false</span>
            <br />
            const handleScroll = () =&gt; &#123;
            <br />
            const scrolledFromTop = window.scrollY + window.innerHeight
            <br />
            const pageHeight = document.documentElement.scrollHeight
            <br />
            const <span className="accent">isCurrentlyAtBottom </span>=
            pageHeight - scrolledFromTop{" "}
            <span className="accent">&lt; offset</span>
            <br />
            if (!ticking) &#123;
            <br />
            <span className="accent">if (isCurrentlyAtBottom)</span> &#123;
            <br />
            setIsBottom(isCurrentlyAtBottom)
            <br />
            <span className="accent"> ticking = true</span>
            <br />
            <span className="accent"> setTimeout</span>(() =&gt;
            setIsBottom(false), 1)
            <br />
            &#125;
            <br />
            &#125;
            <br />
            if (!isCurrentlyAtBottom) ticking = false
            <br />
            &#125;
            <br />
            window.addEventListener('scroll', handleScroll)
            <br />
            return () =&gt; window.removeEventListener('scroll', handleScroll)
            <br />
            &#125;, [offset])
            <br />
            return isBottom
            <br />
            &#125;
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          умови завантаження наступної порції данних
        </div>
        <div className="questBack">
          <p style={{ fontSize: "10px" }}>
            useEffect(() =&gt; &#123;
            <br />
            if (<br />
            <span className="accent"> isBottom</span> && (рез хука
            useScrollToBottom() )<br />
            <span className="accent"> hasNextPage</span>(є данні на наступн
            стор) &&
            <br />
            !isLoading &&
            <br />
            !isFetchingNextPage &&
            <br />
            isSuccess
            <br />
            ) &#123;
            <br />
            <span style={{ color: "green" }}> fetchNextPage()</span>
            <br />
            &#125;
            <br />
            &#125;, [<br />
            isBottom,
            <br />
            hasNextPage,
            <br />
            isLoading,
            <br />
            isFetchingNextPage,
            <br />
            isSuccess,
            <br />
            fetchNextPage,
            <br />
            ])
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Звідки з'явився fetchNextPage() <br />{" "}
        </div>
        <div className="questBack">
          <p> fetchNextPage() Створюється автоматично</p>
          <br />
          <p>
            const &#123; data,
            <span className="accent"> fetchNextPage,</span>
            hasNextPage, isLoading, isFetchingNextPage, isSuccess, &#125;
            <span className="accent">= useGetPostsInfiniteQuery()</span>
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">
          Нескінченне завантаження (build.infiniteQuery)
        </div>
        <div className="questBack">
          <p style={{ fontSize: "10px" }}>
            {" "}
            <span style={{ color: "green" }}>
              {" "}
              getPosts: build.infiniteQuery
            </span>
            (&#123;
            <br />
            <span className="accent"> query:</span> (&#123; pageParam = 1
            &#125;) =&gt; `/posts?_page=$&#123;pageParam&#125;&_limit=10`,
            <br />
            <span style={{ color: "green" }}> infiniteQueryOptions:</span>{" "}
            &#123;
            <br />
            <br />
            <span className="accent"> initialPageParam: </span>1,
            <br />
            <span className="accent"> getNextPageParam:</span> (lastPage,
            allPages) =&gt;
            <br />
            lastPage.remaining &gt; 0 ? allPages.length + 1 : undefined,
            <br />
            &#125;,
            <br />
            <span className="accent"> providesTags:</span> (result) =&gt;
            <br />
            result
            <br />
            ? [<br />
            <span className="accent">...result.pages.flatMap</span>((page) =&gt;
            <br />
            page.items.map((&#123; id &#125;) =&gt; (&#123; type: 'Post', id
            &#125;)) ),
            <br />
            &#123; type: 'Posts', id: 'LIST' &#125;,
            <br />
            ]<br />
            : [&#123; type: 'Posts', id: 'LIST' &#125;],
            <br />
            &#125;),
          </p>
        </div>
      </div>
      <div className="questionsCard">
        <div className="questFront">front</div>
        <div className="questBack">back</div>
      </div>
      <div className="questionsCard">
        <div className="questFront">front</div>
        <div className="questBack">back</div>
      </div>
      <div className="questionsCard">
        <div className="questFront">front</div>
        <div className="questBack">back</div>
      </div>
      <div className="questionsCard">
        <div className="questFront">front</div>
        <div className="questBack">back</div>
      </div>
      <a
        href="https://www.youtube.com/live/y2m9D5hXzGY"
        target="_blank"
        className="mainBtn"
      >
        lesson
      </a>
      <a
        href="https://redux-toolkit.js.org/rtk-query/overview"
        target="_blank"
        className="mainBtn"
      >
        doc RTK Query
      </a>
    </div>
  );
}

export default Tasks;
