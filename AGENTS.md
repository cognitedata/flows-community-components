Code standards
- Getters and setters that do nothing but return or set a value do not need to be documented.
- Short and trivial are not the same thing.
- Private elements of the system are documented as desired or needed (e.g. due to complexity or unusual behaviour).
- If the code changes, the documentation should change with it.

UI vs Business Logic
- Listed are several DOs and DON'Ts to help ensure a clean separation between UI and business logic.
- There are exceptions to every rule! If you have a good reason to why a pattern should not be followed in a particular instance, you can argue that point. Otherwise, use these as a default.
- Be mindful about how much business logic is grouped into a single hook. Just because two values or callbacks share a business domain does not mean they should be returned from the same hook. If your hook is called from multiple components, but each is destructuring different values from a returned object, then your hook is likely doing too much: your components are over-subscribed to updates. This can be resolved by either having the business logic hook called from a single "smart" component that passes the values to hookless "presentational" components, or by splitting the hook into more focused ones.

const FormUI = () => {
    // ✅ DO only include a custom hook containing your business logic, as a bridge
    // This forms the fundamental principle we follow. Crucially, this makes your business logic substantially easier to test than it would be contained within a component.
    // Your business logic hook should expose only a narrow set of what you need, and not e.g. a full query object from a useQuery hook.
    const { state, actions } = useBusinessLogic();

    // ✅ DO include UI related state
    // Internal state that is only applicable to a component, can be included within the component. You might find this to be rare, as many states (show/hide a model) should be considered business logic.
    const [visible, setIsVisible] = useState(false);

    // ✅ DO include use effects that handle user interactions
    // Applicable to certain scenarios, such as ResizeObservers and certain key combination listeners.
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            ...
        });

        resizeObserver.observe(divElem);
        return () => { resizeObserver.unobserve(divElem); };
    });

    // ❌ DON'T use useCallback (or useMemo) for simple functions.
    // Check out https://kentcdodds.com/blog/usememo-and-usecallback for good guidance on when to use useMemo/useCallback
    const handleTodoInputTextChange = useCallback(
        (event: ChangeEvent<HTMLInputElement>) => {
            setTodoInputText(event.target.value);
        },
        [],
    );

    // ✅ DO include UI actions
    const handleTodoInputTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTodoInputText(event.target.value);
    };


    // ❌ DON'T include fetch calls within your component
    // Fetch calls to an API should be handled within your business logic hook. Similar for Authentication.
    // You should expose only what you need from your business logic hook.
    const { service, api } = useAPIService();
    const { user } = useAuth();

    // ❌ DON'T include useQuery directly
    const { data } = useQuery(...);
    const { mutate } = useMutation(...);

    // ❌ DON'T include useEffects that fetch data
    useEffect(() => {
        api.fetch().then(setState);
    }, []);

    // ❌ DON'T include commands.
    // Add them to your business logic component instead
    const addData = useCallback(() => {
        api.addData()
    });

    return <>...</>
}


const useBusinessLogic = () => {
    // ❌ DON'T include state management libraries directly.
    // Wrap it in an abstraction. This keeps potential refactors to our state management can be handled cleanly.
    const recoilAtom = useRecoil();
    const selectedItems = useAtom(selectedItemsAtom);

    // ✅ DO include state management via wrappers
    const selectedItems = useSelectedItemsAtom();

    // ✅ DO include queries
    const query = useQuery();

    // ✅ DO include mutations
    const mutation = useMutation();

    // ✅ DO include commands / public interfaces
    const addData = (data: DataType) => {
        mutation.mutate(data);
        // ...
    }

    // ✅ DO include computed values
    const complexValue = useMemo(() => query.data.length, [query.data]);


    return {
        // ✅ DO expose ONLY what you need
        data: query.data,
        isLoading: query.isLoading,
        addData,
        complexValue,

        // ❌ DON'T expose everything, only whats needed
        query,

        // ❌ DON'T expose mutations directly (use commands/public interface)
        mutation,
    }
}