import { useRecoilState } from "recoil"
import { v4 as uuidv4 } from 'uuid';

import { tabsListState } from "../Atom/todos"

export const useTabs = () => {
    const [tabsList, setTabslist] = useRecoilState(tabsListState)

    function addtabs(tabsInput) {
        setTabslist(old => [...old, {
            key: uuidv4(),
            name: tabsInput,
            create_at: new Date(),
            update_at: new Date(),
        }])
    }

    function updateTab(name, id, key) {
        let olds = [...tabsList];
        olds = olds.map(item => {
            if (item.key === id) {
                return {
                    ...item,
                    name: name,
                    key: key ? key : item.key,
                    update_at: new Date()
                }
            }
            return item;
        });
        setTabslist(olds);
    }

    function deletetabs(keytabs) {
        setTabslist((old) => old.filter((item) => item.key !== keytabs))
    }

    function gettabs(keytabs) {
        return tabsList.filter((item) => item.key === keytabs)
    }

    return { tabsList, addtabs, deletetabs, updateTab, gettabs }
}