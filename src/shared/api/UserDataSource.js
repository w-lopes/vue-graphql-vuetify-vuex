import store from "@/store";
import DataSourceAPI from '@/shared/api/DataSourceAPI';
import getUsersApi from "@/shared/api/getUsersApi";

class UserDataSource extends DataSourceAPI {

  async search(term, isLoadingMore = false) {
    if (!term || (isLoadingMore && !this.hasMore)) {
      return;
    }

    this.hasMore = false;
    const newItems = await getUsersApi(term);
    this.hasMore = store.state.autocompletePage.hasNextPage;
    this.items = this.items.concat(newItems);
  }

  reset() {
    this.items = [];
    this.hasMore = false;
  }
}

export default UserDataSource;
