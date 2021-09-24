import { CircularProgress } from "@material-ui/core";
import { useStore } from "../reducers/store";

const Loader = () => {
  const [store, dispatch] = useStore();
  const { classes, is_loading } = store;

  return (
    is_loading && (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    )
  );
};

export default Loader;
